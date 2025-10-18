import Command, { CommandCategory } from "../classes/Command";

export default new Command("source", "Get the source code for Verbose", CommandCategory.help, [], async (interaction) => {
    interaction.reply("**Verbose** is open source! You can find the code on [GitHub](https://github.com/lanred-dev/verbose)");
});
