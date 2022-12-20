import { Client, REST, Routes, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandChannelOption, SlashCommandIntegerOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandUserOption } from "discord.js";
import { join } from "path";
import parser from "../functions/parser";
import { slashCommand, slashOptions } from "../types/command";
import { botToken, clientId } from "../config.json";
import dictionary from "../types/dictionary";
const rest: REST = new REST({ version: "10" }).setToken(botToken);
const commands: Array<string> = parser(join(__dirname, "./commands"), ".ts");

function buildOptions(command: SlashCommandBuilder, options: slashOptions) {
    options.forEach(({ type, name, description, required }) => {
        switch (type) {
            case "user":
                command.addUserOption((option: SlashCommandUserOption) => option.setName(name).setDescription(description).setRequired(required));
                break;
            case "channel":
                command.addChannelOption((option: SlashCommandChannelOption) => option.setName(name).setDescription(description).setRequired(required));
                break;
            case "role":
                command.addRoleOption((option: SlashCommandRoleOption) => option.setName(name).setDescription(description).setRequired(required));
                break;
            case "string":
                command.addStringOption((option: SlashCommandStringOption) => option.setName(name).setDescription(description).setRequired(required));
                break;
            case "integer":
                command.addIntegerOption((option: SlashCommandIntegerOption) => option.setName(name).setDescription(description).setRequired(required));
                break;
            case "boolean":
                command.addBooleanOption((option: SlashCommandBooleanOption) => option.setName(name).setDescription(description).setRequired(required));
                break;
            case "number":
                command.addNumberOption((option: SlashCommandNumberOption) => option.setName(name).setDescription(description).setRequired(required));
                break;
            default:
                break;
        }
    });
}

function buildCommand({ name, description, options }: slashCommand): RESTPostAPIChatInputApplicationCommandsJSONBody {
    const command: SlashCommandBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

    if (options !== null && typeof options !== "undefined") buildOptions(command, options!);

    return command.toJSON();
}

export let applicationCommands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];
export let applicationCommandsExecute: dictionary = {};

export default async function commandController(client: Client) {
    commands.forEach((command: string) => {
        const {
            commandData: { slash },
            execute,
        } = require(command);
        applicationCommands.push(buildCommand(slash));
        applicationCommandsExecute[slash.name] = execute;
    });

    try {
        console.table(applicationCommands);
        await rest.put(Routes.applicationCommands(clientId), { body: applicationCommands });
    } catch (error) {
        console.error(error);
    }
}
