import { readdirSync, lstatSync } from "fs";
import { join, extname } from "path";

function parse(directory: string, extension: string | void, result: Array<string>) {
    //loop through the files in the directory
    for (const entry of readdirSync(directory)) {
        //check if the entry is a folder or file
        if (lstatSync(join(directory, entry)).isDirectory() === true) {
            //if its a directory then rerun this function with the directory == entry
            parse(join(directory, entry), extension, result);
        } else if ((typeof extension === "string" && extname(entry) === extension) || typeof extension !== "string") {
            //if its a file then add it to the file table
            result.push(join(directory, entry));
        }
    }
}

export default function parser(directory: string, extension: string | void): Array<string> {
    const result: Array<string> = [];
    parse(directory, extension, result);
    return result;
}
