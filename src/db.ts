import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const filePath: string = join(__dirname, "..", process.env.DB_FILE!);
export let data: { users: Record<string, Record<string, number>>; words: Record<string, number> };

function updateDatabase() {
    writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8");
}

try {
    data = JSON.parse(readFileSync(filePath, "utf8"));
} catch {
    data = { users: {}, words: {} };
    updateDatabase();
}

setInterval(updateDatabase, parseInt(process.env.DB_UPDATE_INTERVAL!));

export function incrementWordCount(word: string) {
    if (word in data.words) {
        data.words[word]++;
    } else {
        data.words[word] = 1;
    }
}

export function incrementUserWordCount(userId: string, word: string) {
    if (!data.users[userId]) data.users[userId] = {};

    if (word in data.users[userId]) {
        data.users[userId][word]++;
    } else {
        data.users[userId][word] = 1;
    }
}
