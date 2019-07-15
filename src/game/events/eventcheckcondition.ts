import {EventManager} from "./eventmanager";

export class EnumCheckCondition {
	public static CONDITION_GAME_WIN : string = "CONDITION_GAME_WIN";
}

export class EventCheckCondition {
    public static Manager : EventManager<EventCheckCondition> = new EventManager<EventCheckCondition>();

    public constructor() { 
    }
} 