import { Message, Events } from "discord.js";
<<<<<<< HEAD
import { common as commonWords } from "../../common.json";
=======
import gibberish from "@lanred/gibberish-detective";
import { common as commonWords } from "../../resources/common.json";
>>>>>>> bcf63dc (update)
import recentWords from "../../recent";

export const eventName: string = Events.MessageCreate;

export const once: boolean = false;

export function eventController(message: Message) {
    if (message.author.bot === true) return;
<<<<<<< HEAD

    message.cleanContent.split(" ").forEach((word: string) => {
        word = word
            .toLowerCase()
            .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
            .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "")
            .replace(/[0-9]/g, "");

        if (commonWords.includes(word) === true || word.length > 50 || word.length <= 2) return;

        if (typeof recentWords[word] === "number") {
            recentWords[word]++;
        } else {
            recentWords[word] = 1;
        }
    });
=======
    
    message.cleanContent
        .toLowerCase()
        .replace(/<:[A-Za-z]*:[0-9]*>/g, "")
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
        .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, " ")
        .replace(/[0-9]/g, " ")
        .split(" ")
        .forEach((word: string) => {
            if (commonWords.includes(word) === true || word.length > 50 || word.length <= 2 || gibberish.detect(word) === true) return;

            if (typeof recentWords[word] !== "undefined") {
                recentWords[word].uses++;
                recentWords[word].date = new Date();
            } else {
                recentWords[word] = { uses: 1, date: new Date() };
            }
        });
>>>>>>> bcf63dc (update)
}
