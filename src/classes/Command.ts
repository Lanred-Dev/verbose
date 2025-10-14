import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export enum CommandCategory {
    help = "Help",
    words = "Words",
}

export default class Command {
    readonly usage: string;
    readonly cooldown: number;
    readonly category: CommandCategory;
    readonly slash: {
        name: string;
        description: string;
    };
    readonly command: SlashCommandBuilder;

    execute: (interaction: CommandInteraction) => void;

    constructor(usage: string, cooldown: number, category: CommandCategory, slash: { name: string; description: string }, execute: (interaction: CommandInteraction) => void) {
        this.usage = usage;
        this.cooldown = cooldown;
        this.category = category;
        this.slash = slash;
        this.execute = execute;

        this.command = new SlashCommandBuilder().setName(this.slash.name).setDescription(this.slash.description);
    }
}
