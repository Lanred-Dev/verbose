import Command, { CommandCategory } from "../classes/Command";

export default new Command(
    "source",
    5,
    CommandCategory.words,
    {
        name: "source",
        description: "The source code of Verbose",
    },
    async (interaction) => {
        interaction.reply("**Verbose** is open source! You can find the code on [GitHub](https://github.com/lanred-dev/verbose)");
    }
);
