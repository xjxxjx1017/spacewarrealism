import {EventManager} from "./eventmanager";

export enum EBrushType { 
    BRUSH_NORMAL, 
    BRUSH_ERASE, 
};

export class EventShipBrush {
    public static Manager : EventManager<EventShipBrush> = new EventManager<EventShipBrush>();

    public pos : Phaser.Geom.Point;
    public brushType : EBrushType;
    public brushSize : number;

    public constructor( _pos : Phaser.Geom.Point,
        _brushType : EBrushType, _brushSize : number ) {
        this.pos = _pos;
        this.brushType = _brushType;
        this.brushSize = _brushSize;
    }
}