import "phaser";
import {EventManager} from "./eventmanager";

export class EventShipBrush {
    public static BRUSH_NORMAL : string = "BRUSH_NORMAL";
    public static BRUSH_ERASE : string = "BRUSH_ERASE";
    public static Manager : EventManager<EventShipBrush> = new EventManager<EventShipBrush>();

    public pos : Phaser.Geom.Point;
    public brushType : string;
    public brushSize : number;

    public constructor( _pos : Phaser.Geom.Point,
        _brushType : string, _brushSize : number ) {
        this.pos = _pos;
        this.brushType = _brushType;
        this.brushSize = _brushSize;
    }
}