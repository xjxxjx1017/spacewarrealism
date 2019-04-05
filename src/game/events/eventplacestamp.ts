import "phaser";
import {EventManager} from "./eventmanager";

export enum EStampType { 
    STAMP_TURRET_RED, 
    STAMP_SHIELD, 
};

export class EventStampType {
    public static Manager : EventManager<EventStampType> = new EventManager<EventStampType>();

    public pos : Phaser.Geom.Point;
    public type : EStampType;

    public constructor( _pos : Phaser.Geom.Point,
        _type : EStampType ) {
        this.pos = _pos;
        this.type = _type;
    }
}