import { Client, Events, ActivityType } from "discord.js";
import Event from "../classes/Event";

export default new Event(Events.ClientReady, true, async (client: Client) => {
    console.log("Verbose has been started");

    let type: ActivityType;

    if (process.env.PRESENCE_TYPE && process.env.PRESENCE_TYPE in ActivityType) {
        type = ActivityType[process.env.PRESENCE_TYPE as keyof typeof ActivityType];
    } else {
        console.warn(`Invalid PRESENCE_TYPE "${process.env.PRESENCE_TYPE}" provided in .env, defaulting to "Playing"`);
        type = ActivityType.Playing;
    }

    client.user?.setPresence({
        activities: [
            {
                name: process.env.PRESENCE_ACTIVITY!,
                type,
            },
        ],
    });
});
