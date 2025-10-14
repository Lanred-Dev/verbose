export default class Event {
    readonly id: string;
    readonly once: boolean;
    readonly execute: (...args: any[]) => void;

    constructor(id: string, once: boolean, execute: (...args: any[]) => void) {
        this.id = id;
        this.once = once;
        this.execute = execute;
    }
}
