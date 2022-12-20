import { connect, ConnectOptions, Error } from "mongoose";
import wordSchema from "../models/word";
import { recentWords, clear as clearRecentWords } from "../recent";
import { dbUri } from "../config.json";

export default function dbController() {
    connect(dbUri, {
        retryWrites: true,
        w: "majority",
        useUnifiedTopology: true,
        useNewUrlParser: true,
    } as ConnectOptions)
        .then(() => {
            console.log("connected to mongodb");

            setInterval(() => {
                if (Object.keys(recentWords).length === 0) return;

                const bulkUpdate = wordSchema.collection.initializeUnorderedBulkOp();

                for (let [key, value] of Object.entries(recentWords)) {
                    bulkUpdate
                        .find({ word: key })
                        .upsert()
                        .update({ $inc: { uses: value.uses }, $set: { date: value.date } });
                }

                bulkUpdate.execute().then(clearRecentWords);
            }, 300000);
        })
        .catch((error: Error) => {
            console.log("failed to connect to mongodb\n", error.message);
        });
}
