import dictionary from "./types/dictionary";

export let recentWords: dictionary = {};

export function clear() {
    recentWords = {};
}

export default recentWords;
