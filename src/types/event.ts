export type event = {
    eventName: string;
    once: boolean;
    eventController: () => void;
}

export default event;