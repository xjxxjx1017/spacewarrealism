import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../ui-components/panel-edit-ship";
import {EventShipBrush, EBrushType} from "../events/eventshipbrush";
import {Gun} from "../objects/gun";
import {EventStampType, EStampType} from "../events/eventplacestamp";

export class Ship {
    public dataRect : Phaser.Geom.Rectangle;
	private dataGame : Phaser.Scene;
    public dataShipEntity : FkDestructibleObject;
    private dataGunList : Gun[];

	public constructor( _game : Phaser.Scene, _rect : Phaser.Geom.Rectangle ) {
        var self = this;

		this.dataGame = _game;
        this.dataRect = _rect;

        // Init ship body entity and events
        this.dataShipEntity = new FkDestructibleObject( self.dataGame, _rect.x, _rect.y, 
            _rect.width, _rect.height, null );
        this.dataShipEntity.drawDstrObject();
        EventShipBrush.Manager.attach( this, (evt)=> { self.onBrushDraw( evt ); } );

        // Init guns on ship
        this.dataGunList = [];
        EventStampType.Manager.attach( this, (evt)=> { self.onPlaceStamp( evt ); } );

        // Auto attack every seconds
        var timedEvent = this.dataGame.time.addEvent({ delay: 1000, callback: ()=> {
            _.forEach( self.dataGunList, function(g) {
                g.attack( self );
            } )
        }, repeat: 400 });
	}

    private onPlaceStamp( _evt : EventStampType ) {
        if ( !this.dataShipEntity.collisionWithPoint( _evt.pos, FkDstrGridData.getStateVisible() ) )
            return;
        switch ( _evt.type ) {
            case EStampType.STAMP_TURRET_RED:
                var g = new Gun( this.dataGame, new Phaser.Geom.Point( _evt.pos.x, _evt.pos.y ) );
                this.dataGunList.push( g );
                break;
            default:
                console.log( "Brush not found." );
                break;
        }
    }

    private onBrushDraw( _evt : EventShipBrush ) {
    	switch ( _evt.brushType ) {
    		case EBrushType.BRUSH_NORMAL:
    			this.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( _evt.pos.x, _evt.pos.y, _evt.brushSize ),
    				FkDstrGridData.getStateVisible() );
				this.dataShipEntity.drawDstrObject();
    			break;
    		case EBrushType.BRUSH_ERASE:
    			this.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( _evt.pos.x, _evt.pos.y, _evt.brushSize ),
    				FkDstrGridData.getStateHide() );
				this.dataShipEntity.drawDstrObject();
    			break;
    		default:
    			console.log( "Brush not found." );
    			break;
    	}
    }
}