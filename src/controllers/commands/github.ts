import { CommandInteraction } from "discord.js";

export const commandData = {
    usage: "github",
    permissions: [],
    cooldown: 0,
    category: "help",
    slash: {
        name: "github",
        description: "Get the most used words.",
    },
};

export function execute(interaction: CommandInteraction) {
    interaction.reply("**Bananas Words** is a open source bot!\nyou can view its source code here: https://github.com/Lanred-Dev/bananas-words")
}
