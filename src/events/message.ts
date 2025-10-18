import { Events, Message } from "discord.js";
import Event from "../classes/Event";
import parser from "../utils/parser";
import { incrementUserWordCount, incrementWordCount } from "../db";

const TRACK_USER_WORDS: boolean = process.env.TRACK_USER_WORDS === "true";

export default new Event(Events.MessageCreate, false, async (message: Message) => {
    if (message.author.bot) return;

    const words: string[] = parser(message);

    if (words.length === 0) return;

    words.forEach((word) => {
        incrementWordCount(word);

        if (TRACK_USER_WORDS) incrementUserWordCount(message.author.id, word);
    });
});
