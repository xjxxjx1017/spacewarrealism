import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../controller/panel-edit-ship";

export class FkEventShipBrush {
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

export class FkShip {
    public static EVENT_DRAW : string = "DRAW";
    public static BRUSH_NORMAL : string = "BRUSH_NORMAL";
    public static BRUSH_ERASE : string = "BRUSH_ERASE";
    public dataRect : Phaser.Geom.Rectangle;
	private dataGame : Phaser.Scene;
    private dataShipEntity : FkDestructibleObject;

	public constructor( _game : Phaser.Scene, _rect : Phaser.Geom.Rectangle ) {
        var self = this;
		this.dataGame = _game;
        this.dataRect = _rect;

        this.dataShipEntity = new FkDestructibleObject( self.dataGame, _rect.x, _rect.y, 
            _rect.width, _rect.height, null );
        this.dataShipEntity.drawDstrObject();
	}

    public eventAction( _evt : FkEventShipBrush ) {
        var self = this;
        switch ( _evt.name ) {
            case FkShip.EVENT_DRAW:
                self.onBrushDraw( _evt );
                break;
        }
    }

    private onBrushDraw( _evt : FkEventShipBrush ) {
        var self = this;
    	switch ( _evt.brushType ) {
    		case FkShip.BRUSH_NORMAL:
    			self.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( _evt.pos.x, _evt.pos.y, _evt.brushSize ),
    				FkDstrGridData.getStateVisible() );
				self.dataShipEntity.drawDstrObject();
    			break;
    		case FkShip.BRUSH_ERASE:
    			self.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( _evt.pos.x, _evt.pos.y, _evt.brushSize ),
    				FkDstrGridData.getStateHide() );
				self.dataShipEntity.drawDstrObject();
    			break;
    		default:
    			console.log( "Brush not found." );
    			break;
    	}
    }
}