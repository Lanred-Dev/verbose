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
<<<<<<< HEAD
                if (Object.keys(recentWords).length === 0) return console.log("no new words");

                console.log("updating...");
                console.table(recentWords);
=======
                if (Object.keys(recentWords).length === 0) return;

>>>>>>> bcf63dc (update)
                const bulkUpdate = wordSchema.collection.initializeUnorderedBulkOp();

                for (let [key, value] of Object.entries(recentWords)) {
                    bulkUpdate
                        .find({ word: key })
                        .upsert()
<<<<<<< HEAD
                        .update({ $inc: { uses: value } });
=======
                        .update({ $inc: { uses: value.uses }, $set: { date: value.date } });
>>>>>>> bcf63dc (update)
                }

                bulkUpdate.execute().then(clearRecentWords);
            }, 300000);
        })
        .catch((error: Error) => {
            console.log("failed to connect to mongodb\n", error.message);
        });
}
