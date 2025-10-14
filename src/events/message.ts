import { Events, Message } from "discord.js";
import Event from "../classes/Event";
import parser from "../utils/parser";

export default new Event(Events.MessageCreate, false, async (message: Message) => {
    if (message.author.bot) return;

    const words: string[] = parser(message);

    if (words.length === 0) return;

    console.log(`Message from ${message.author.tag}:`, words);
});
