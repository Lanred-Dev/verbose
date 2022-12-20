import { Client, GatewayIntentBits } from "discord.js";
<<<<<<< HEAD
=======
import gibberish from "@lanred/gibberish-detective";
>>>>>>> bcf63dc (update)
import db from "./controllers/db";
import events from "./controllers/event";
import commands from "./controllers/commands";
import { botToken } from "./config.json";
const client: Client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

<<<<<<< HEAD
=======
//setup gibberish detector
gibberish.set("useCache", true);

>>>>>>> bcf63dc (update)
//load mongodb
db();

//init client
events(client);
commands(client);
client.login(botToken);

<<<<<<< HEAD
//add option for custom phrases and most used phrases
=======
//add option for custom phrases and most used phrases
//make a algorithim for detecting the most common words used
//fork gibbersih detector to work
>>>>>>> bcf63dc (update)
