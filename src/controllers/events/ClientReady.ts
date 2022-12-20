import { Client, Events, ActivityType } from "discord.js";

export const eventName: string = Events.ClientReady;

export const once: boolean = true;

export function eventController(client: Client) {
    console.log("client ready.");
    
    client.user?.setPresence({
        activities: [
            {
                name: "your words",
                type: ActivityType.Watching,
            }
        ],
    })
}
