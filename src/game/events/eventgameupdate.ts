import {EventManager} from "./eventmanager";

export class EventGameUpdate {
    public static Manager : EventManager<EventGameUpdate> = new EventManager<EventGameUpdate>();

    public time: number;
    public delta: number;

    public constructor( time: number, delta: number ) {
        this.time = time;
        this.delta = delta;
    }
}