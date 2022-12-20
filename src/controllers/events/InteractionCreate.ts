import { CommandInteraction, Events } from "discord.js";
import { applicationCommandsExecute } from "../commands";

export const eventName: string = Events.InteractionCreate;

export const once: boolean = false;

export function eventController(interaction: CommandInteraction) {
    if (interaction.isChatInputCommand() === false || interaction.isButton() === true) return;

    if (applicationCommandsExecute[interaction.commandName] === null) return;

    applicationCommandsExecute[interaction.commandName](interaction);
}
