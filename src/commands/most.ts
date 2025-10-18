import { EmbedBuilder, User } from "discord.js";
import Command, { CommandArgumentType, CommandCategory } from "../classes/Command";
import { data } from "../db";

function sortWords(words: { [word: string]: number }, [start, end]: [number, number]): string {
    const sorted: [string, number][] = Object.entries(words).sort((a, b) => b[1] - a[1]);
    return sorted
        .slice(start - 1, end - 1)
        .map(([word, count], index) => `**${index + 1}.** ${word} - ${count} times`)
        .join("\n");
}

export default new Command(
    "most",
    "Get the most used words",
    CommandCategory.words,
    [
        {
            name: "user",
            description: "Get the most used words for a specific user",
            type: CommandArgumentType.USER,
            required: false,
        },
        {
            name: "range",
            description: "The range of words to display based off their rank (X-Y)",
            type: CommandArgumentType.STRING,
            required: false,
        },
    ],
    async (interaction) => {
        const user: User | null = interaction.options.getUser("user");
        const range = interaction.options.getString("range");
        let [start, end] = range ? range.split("-").map(Number) : [1, 10];

        if (start < 1 || end < 1 || start > end) {
            interaction.reply("Invalid range specified. (X-Y)");
            return;
        }

        let description: string;
        let name: string;
        let totalWords: number;

        if (user) {
            const userData = data.users[user.id];

            if (!userData || Object.keys(userData).length === 0) {
                interaction.reply(`Well... this is awkward. **${user.username}** does not speak very much!`);
                return;
            } else if (start > Object.keys(userData).length) {
                interaction.reply(`**${user.username}** has not used enough words to display the range ${start}-${end}!`);
                return;
            }

            name = user.username;
            description = sortWords(userData, [start, end]);
            totalWords = Object.keys(userData).length;
        } else {
            if (Object.keys(data.words).length === 0) {
                interaction.reply("It appears that everyone uses very few and common words... maybe speak more?");
                return;
            } else if (start > Object.keys(data.words).length) {
                interaction.reply(`The server has not recorded enough words to display the range ${start}-${end}!`);
                return;
            }

            name = interaction.guild!.name;
            description = sortWords(data.words, [start, end]);
            totalWords = Object.keys(data.words).length;
        }

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${name}'s most used words`)
                    .setDescription(description)
                    .setTimestamp()
                    .setFooter({ text: `${start}-${end} of ${totalWords} total words` }),
            ],
        });
    }
);
