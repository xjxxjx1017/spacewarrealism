import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../ui-components/panel-edit-ship";
import {EventShipBrush, EBrushType} from "../events/eventshipbrush";

export class Ship {
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

        EventShipBrush.Manager.attach( this, (evt)=> { self.onBrushDraw( evt ); } );
	}

    private onBrushDraw( _evt : EventShipBrush ) {
        var self = this;
    	switch ( _evt.brushType ) {
    		case EBrushType.BRUSH_NORMAL:
    			self.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( _evt.pos.x, _evt.pos.y, _evt.brushSize ),
    				FkDstrGridData.getStateVisible() );
				self.dataShipEntity.drawDstrObject();
    			break;
    		case EBrushType.BRUSH_ERASE:
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