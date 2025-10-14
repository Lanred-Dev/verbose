import { lstatSync, readdirSync } from "fs";
import { extname, join } from "path";

export default function getFilesFromDirectory(directory: string, extension: string | void, array: any[]) {
    for (const entry of readdirSync(directory)) {
        if (lstatSync(join(directory, entry)).isDirectory() === true) {
            getFilesFromDirectory(join(directory, entry), extension, array);
        } else if ((typeof extension === "string" && extname(entry) === extension) || typeof extension !== "string") {
            const mod = require(join(directory, entry));
            array.push(mod.default || mod);
        }
    }
}
