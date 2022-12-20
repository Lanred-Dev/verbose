import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Pagination } from "pagination.djs";
import { word } from "../../models/word";
import recentWords from "../../recent";

export const commandData = {
    usage: "recent",
    permissions: [],
    cooldown: 0,
    category: "words",
    slash: {
        name: "recent",
        description: "Get the most recently used words.",
    },
};

export function execute(interaction: CommandInteraction) {
    const recentWordsKeys: Array<string> = Object.keys(recentWords);

    if (recentWordsKeys.length <= 0) {
        interaction.reply(":x::book: no recent words.");
        return;
    }

    const usedDate: number = Math.round(new Date().getTime() / 1000);
    const paginationEmbeds: Array<EmbedBuilder> = [];

    for (let index = 0; index < Math.round(recentWordsKeys.length / 10) + 1; index++) {
        paginationEmbeds.push(new EmbedBuilder().setTitle(`Embed ${index + 1}`));
    }

    const paginationEmbed: Pagination = new Pagination(interaction as any);
    paginationEmbed.setLimit(1);
    paginationEmbed.addAuthorizedUser(interaction.user.username);
    paginationEmbed.setDescriptions(
        recentWordsKeys
            .map(function (key: string) {
                return { word: key, uses: recentWords[key].uses, date: recentWords[key].date };
            })
            .sort((word1: word, word2: word) => {
                if (word1.uses > word2.uses) {
                    return -1;
                } else if (word1.uses < word2.uses) {
                    return 1;
                } else {
                    return 0;
                }
            })
            .map((wordData, index: number) => `${index + 1}.) **${wordData.word}** with ${wordData.uses} ${wordData.uses <= 1 ? `use` : "uses"} (last used <t:${Math.round(wordData.date.getTime() / 1000)}:R>)`)
            .join(`\n`)
    );
    paginationEmbed.setEmbeds(paginationEmbeds, (embed: EmbedBuilder, index: number, array: Array<any>) => {
        return embed
            .setColor("#ffe135")
            .setTitle(`Recent (5 minutes) rankings ${index === 0 ? 1 : (index * 10) + 1}-${(index + 1) * 10}`)
            .setDescription(`results as of <t:${usedDate}:t>\n\n${paginationEmbed.descriptions[index]}`)
            .setFooter({ text: `command used by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() });
    });
    paginationEmbed.render();
}
