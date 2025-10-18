import { CommandInteraction, Events } from "discord.js";
import Event from "../classes/Event";
import getFilesFromDirectory from "../utils/getFilesFromDirectory";
import { join } from "path";
import Command from "../classes/Command";

const commands: Command[] = [];
getFilesFromDirectory(join(__dirname, "../commands"), ".js", commands);

export default new Event(Events.InteractionCreate, false, async (interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand() === false || interaction.isButton() === true) return;

    commands.find(({ name }) => name === interaction.commandName)?.execute(interaction);
});
