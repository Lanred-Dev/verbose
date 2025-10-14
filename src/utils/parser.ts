import { Message } from "discord.js";
import { readFile } from "fs";
import { join } from "path";

const MINIMUM_WORD_LENGTH: number = parseInt(process.env.MINIMUM_WORD_LENGTH || "3");

let commonWords: Set<string>;
readFile(join(__dirname, "../common.txt"), "utf8", (error, data) => {
    if (error) {
        console.error("Error loading common words:", error);
        return;
    }

    commonWords = new Set(data.split("\n").map((word) => word.trim().toLowerCase()));
});

/**
 * Remove common words, gibberish, numbers, links, and emojis from messages.
 *
 * @param message
 * @returns Valid words from a message
 */
export default function parser(message: Message): string[] {
    return message.cleanContent
        .toLowerCase()
        .replace(/<:[A-Za-z]*:[0-9]*>/g, "")
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
        .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, " ")
        .replace(/[0-9]/g, " ")
        .split(" ")
        .filter((word) => word.length > MINIMUM_WORD_LENGTH && !commonWords.has(word) && /^[a-zA-Z]+$/.test(word));
}
