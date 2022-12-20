import { EmbedBuilder } from "discord.js";
import embedData from "../types/embed";

export default class embed {
    embed: EmbedBuilder;
    embedData: embedData;

    constructor(embedData: embedData) {
        this.embedData = embedData;
        this.embed = new EmbedBuilder().setColor("#ffe135");
    }

    build() {

    }
};