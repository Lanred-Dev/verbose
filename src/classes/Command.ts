import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export enum CommandCategory {
    help = "Help",
    words = "Words",
}

export enum CommandArgumentType {
    STRING,
    USER,
}

type CommandArgument = {
    name: string;
    description: string;
    type: CommandArgumentType;
    required: boolean;
};

export default class Command {
    readonly name: string;
    readonly description: string;
    readonly args: CommandArgument[];
    readonly category: CommandCategory;
    readonly command: SlashCommandBuilder;

    execute: (interaction: ChatInputCommandInteraction) => void;

    constructor(name: string, description: string, category: CommandCategory, args: CommandArgument[], execute: (interaction: ChatInputCommandInteraction) => void) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.args = args;
        this.execute = execute;
        this.command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        for (const { name, description, required, type } of this.args) {
            switch (type) {
                case CommandArgumentType.STRING:
                    this.command.addStringOption((option) => option.setName(name).setDescription(description).setRequired(required));
                    break;
                case CommandArgumentType.USER:
                    this.command.addUserOption((option) => option.setName(name).setDescription(description).setRequired(required));
                    break;
            }
        }
    }
}
