import {EventManager} from "./eventmanager";

export enum EGameModeChanged { 
    MODE_BATTLE, 
    MODE_EDIT, 
};

export class EventGameModeChanged {
    public static Manager : EventManager<EventGameModeChanged> = new EventManager<EventGameModeChanged>();

    public mode: EGameModeChanged;

    public constructor( mode: EGameModeChanged ) {
        this.mode = mode;
    }
}