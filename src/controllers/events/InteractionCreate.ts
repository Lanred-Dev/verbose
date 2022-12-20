import { CommandInteraction, Events } from "discord.js";
import { applicationCommandsExecute } from "../commands";

export const eventName: string = Events.InteractionCreate;

export const once: boolean = false;

export function eventController(interaction: CommandInteraction) {
<<<<<<< HEAD
    if (interaction.isChatInputCommand() === false) return;
=======
    if (interaction.isChatInputCommand() === false || interaction.isButton() === true) return;
>>>>>>> bcf63dc (update)

    if (applicationCommandsExecute[interaction.commandName] === null) return;

    applicationCommandsExecute[interaction.commandName](interaction);
}
