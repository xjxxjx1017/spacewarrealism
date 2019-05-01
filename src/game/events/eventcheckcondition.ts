import "phaser";
import {EventManager} from "./eventmanager";

export enum EnumCheckCondition {
	CONDITION_GAME_WIN,
}

export class EventCheckCondition {
    public static Manager : EventManager<EventCheckCondition> = new EventManager<EventCheckCondition>();

    public constructor() { 
    }
} 