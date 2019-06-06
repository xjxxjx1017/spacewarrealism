import {EventManager} from "./eventmanager";

export class EventEntityUpdate {
    public static Manager : EventManager<EventEntityUpdate> = new EventManager<EventEntityUpdate>();

    public constructor() { 
    }
} 