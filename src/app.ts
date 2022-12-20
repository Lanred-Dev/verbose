import { Client, GatewayIntentBits } from "discord.js";
import gibberish from "@lanred/gibberish-detective";
import db from "./controllers/db";
import events from "./controllers/event";
import commands from "./controllers/commands";
import { botToken } from "./config.json";
const client: Client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

//setup gibberish detector
gibberish.set("useCache", true);

//load mongodb
db();

//init client
events(client);
commands(client);
client.login(botToken);
