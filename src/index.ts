import { config } from "dotenv";
config();

import { join } from "path";
import Event from "./classes/Event";
import { Client, GatewayIntentBits, REST } from "discord.js";
import Command from "./classes/Command";
import getFilesFromDirectory from "./utils/getFilesFromDirectory";

const client: Client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const restClient: REST = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

const events: Event[] = [];
getFilesFromDirectory(join(__dirname, "events"), ".js", events);

events.forEach((event) => {
    if (event.once) {
        client.once(event.id, event.execute);
    } else {
        client.on(event.id, event.execute);
    }

    console.log(`Registered event: ${event.id}`);
});

const commands: Command[] = [];
getFilesFromDirectory(join(__dirname, "commands"), ".js", commands);
const commandData = commands.map((command) => command.command.toJSON());

restClient
    .put(`/applications/${process.env.DISCORD_CLIENT_ID}/commands`, { body: commandData })
    .then(() => {
        console.log("All commands registered successfully");
    })
    .catch((error) => {
        console.error("Failed to register commands:", error);
    });

client.login(process.env.DISCORD_TOKEN);
