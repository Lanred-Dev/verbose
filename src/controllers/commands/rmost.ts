import { CommandInteraction, EmbedBuilder } from "discord.js";
import axios from "axios";
import wordSchema from "../../models/word";
import dictionary from "../../types/dictionary";

export const commandData = {
    usage: "rmost",
    permissions: [],
    cooldown: 0,
    category: "words",
    slash: {
        name: "rmost",
        description: "Get a random word from the most used words.",
    },
};

function formatMeanings(meanings: dictionary) {
    return meanings.map((meaningData: { partOfSpeech: any; definitions: { definition: any }[] }) => `**${meaningData.partOfSpeech}**\n${meaningData.definitions[0].definition}`).join(`\n`);
}

export async function execute(interaction: CommandInteraction) {
    let randomWord = (await wordSchema.aggregate([{ $sample: { size: 1 } }])) as any;

    if (typeof randomWord !== "undefined") randomWord = randomWord[0];

    axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord.word}`)
        .then(function (response: any) {
            let words = [];

            response.data.forEach((word: { meanings: any[]; }) => {
                word.meanings.forEach((meaning: any) => {
                    words.push(meaning);
                });
            });

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("#ffe135")
                        .setTitle(randomWord.word)
                        .setDescription(`**${randomWord.uses} ${randomWord.uses <= 1 ? `use` : "uses"}**\n\n${formatMeanings(words)}`)
                        .setFooter({ text: `command used by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() }),
                ],
            });
        })
        .catch(function () {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("#ffe135")
                        .setTitle(randomWord.word)
                        .setDescription(`**${randomWord.uses} ${randomWord.uses <= 1 ? `use` : "uses"}**\n\nno definitions found`)
                        .setFooter({ text: `command used by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() }),
                ],
            });
        });
}
