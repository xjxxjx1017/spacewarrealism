import "phaser";

export class EventShipBrush {
    public static EVENT_DRAW : string = "DRAW";
    public static BRUSH_NORMAL : string = "BRUSH_NORMAL";
    public static BRUSH_ERASE : string = "BRUSH_ERASE";
    public name : string;
    public pos : Phaser.Geom.Point;
    public brushType : string;
    public brushSize : number;

    public constructor( _name : string, _pos : Phaser.Geom.Point,
        _brushType : string, _brushSize : number ) {
        this.name = _name;
        this.pos = _pos;
        this.brushType = _brushType;
        this.brushSize = _brushSize;
    }
}