<<<<<<< HEAD
import { CommandInteraction } from "discord.js";
import { Error } from "mongoose";
=======
import { CommandInteraction, EmbedBuilder, TextChannel, ButtonStyle, Embed } from "discord.js";
import { Error } from "mongoose";
import { Pagination } from "pagination.djs";
>>>>>>> bcf63dc (update)
import wordSchema, { word } from "../../models/word";
import recentWords from "../../recent";
import dictionary from "../../types/dictionary";

export const commandData = {
    usage: "most",
    permissions: [],
    cooldown: 0,
    category: "words",
    slash: {
        name: "most",
        description: "Get the most used words.",
    },
};

export function execute(interaction: CommandInteraction) {
    wordSchema
        .find({})
        .sort({ uses: -1 })
        .collation({ locale: "en_US", numericOrdering: true })
        .limit(100)
<<<<<<< HEAD
        .exec((error: Error | null, words: any) => {
            if (error !== null) {
                interaction.reply("sorry, error!");
=======
        .exec(async (error: Error | null, words: any) => {
            if (error !== null) {
                interaction.reply(":x::book: sorry, error!");
>>>>>>> bcf63dc (update)
                return;
            }

            if (Object.keys(recentWords).length > 0) {
                let existingWords: dictionary = Object.assign({}, ...words.map(({ word }, index: number) => ({ [word]: index })));
                let existingWordsKeys: Array<string> = Object.keys(existingWords);

                for (let [key, value] of Object.entries(recentWords)) {
                    if (existingWordsKeys.includes(key)) {
<<<<<<< HEAD
                        words[existingWords[key]].uses += value;
=======
                        words[existingWords[key]].uses += value.uses;
                        words[existingWords[key]].date += value.date;
>>>>>>> bcf63dc (update)
                        continue;
                    }

                    words.push({
                        word: key,
<<<<<<< HEAD
                        uses: value,
=======
                        uses: value.uses,
                        date: value.date,
>>>>>>> bcf63dc (update)
                    });
                }

                existingWords = null;
                existingWordsKeys = null;

                words.sort((word1: word, word2: word) => {
                    if (word1.uses > word2.uses) {
                        return -1;
                    } else if (word1.uses < word2.uses) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }

<<<<<<< HEAD
            interaction.reply(
                words.length > 0
                    ? words.reduce((final: any, wordData: any, index: number) => {
                          return `${final}${index + 1}.) **${wordData.word}** with ${wordData.uses} uses\n`;
                      }, "")
                    : "no words"
            );
=======
            const usedDate: number = Math.round(new Date().getTime() / 1000);
            const paginationEmbeds: Array<EmbedBuilder> = [];

            for (let index = 0; index < 10; index++) {
                paginationEmbeds.push(new EmbedBuilder());
            }

            const paginationEmbed: Pagination = new Pagination(interaction as any);
            paginationEmbed.setLimit(1);
            paginationEmbed.addAuthorizedUser(interaction.user.username);
            paginationEmbed.setDescriptions(
                words
                    .reduce((resultArray: Array<any>, item: any, index: number) => {
                        const chunkIndex: number = Math.floor(index / 10);

                        if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];

                        resultArray[chunkIndex].push(item);

                        return resultArray;
                    }, [])
                    .map((words: any, mapIndex: number) => {
                        return words.length > 0
                            ? words.reduce((final: any, wordData: any, index: number) => {
                                  return `${final}${index + 1 + mapIndex * 10}.) **${wordData.word}** with ${wordData.uses} ${wordData.uses <= 1 ? `use` : "uses"} (last used ${typeof wordData.date !== "undefined" && wordData.date !== null ? `<t:${Math.round(wordData.date.getTime() / 1000)}:R>` : "unknown"})\n`;
                              }, "")
                            : "no words";
                    })
            );
            paginationEmbed.setEmbeds(paginationEmbeds, (embed: EmbedBuilder, index: number, array: Array<any>) => {
                return embed
                    .setColor("#ffe135")
                    .setTitle(`All time rankings ${index === 0 ? 1 : (index * 10) + 1}-${(index + 1) * 10}`)
                    .setDescription(`results as of <t:${usedDate}:t>\n\n${paginationEmbed.descriptions[index]}`)
                    .setFooter({ text: `command used by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() });
            });
            paginationEmbed.render();
>>>>>>> bcf63dc (update)
        });
}
