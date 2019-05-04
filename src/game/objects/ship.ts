import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../ui-components/panel-edit-ship";
import {EventShipBrush, EBrushType} from "../events/eventshipbrush";
import {Gun} from "../objects/gun";
import {EventStampType, EStampType} from "../events/eventplacestamp";
import {EventHpChanged} from "../events/eventhpchanged";

export class Ship {
    public dataRect : Phaser.Geom.Rectangle;
	private dataGame : Phaser.Scene;
    public dataShipEntity : FkDestructibleObject;
    private dataGunList : Gun[];

    public save() {
        var tmp = JSON.stringify( this.dataShipEntity );
        return tmp;
    }

    public load( s : string ) {
        var tmp = JSON.parse( s );
        this.dataShipEntity = tmp;
        this.dataShipEntity.drawDstrObject();
    }

	public constructor( _game : Phaser.Scene, _rect : Phaser.Geom.Rectangle ) {
        var self = this;

		this.dataGame = _game;
        this.dataRect = _rect;

        // Init ship body entity and events
        this.dataShipEntity = new FkDestructibleObject( self.dataGame, _rect.x, _rect.y, 
            _rect.width, _rect.height, null, (item) => { self.onEntityUpdate(item) } );
        // Init guns on ship
        this.dataGunList = [];
        // Init events
        EventShipBrush.Manager.attach( this, (id,evt)=> { self.onBrushDraw( evt ); } );
        EventStampType.Manager.attach( this, (id,evt)=> { self.onPlaceStamp( evt ); } );
        // Show Object
        this.dataShipEntity.drawDstrObject();
	}

    public getHp() : number {
        return Math.floor( this.dataShipEntity.area( function(node : FkDstrGridData) : boolean { 
                return node.dataIsVisible;
            }) * 100 );
    }

    private onEntityUpdate( item : FkDestructibleObject ) {
        var hp = this.getHp();
        EventHpChanged.Manager.notify( new EventHpChanged( this, hp) );
    }

    public attack( _target : Ship ) {
        var self = this;
        _.forEach( self.dataGunList, function(g) {
            g.attack( _target, 20 );
        });
    }

    public attackedByLine( _srcPoint : Phaser.Geom.Point, _targetPoint : Phaser.Geom.Point, _strength : number ) {
        var self = this;
        self.dataShipEntity.modifyByLine( _srcPoint.x, _srcPoint.y, 
            _targetPoint.x, _targetPoint.y, _strength,
            FkDstrGridData.getStateHide() );
        self.dataShipEntity.drawDstrObject();
        var toRemove = [];
        _.forEach( self.dataGunList, function(g) {
            var b = self.dataShipEntity.collisionWithPoint( g.dataPos, FkDstrGridData.getStateVisible() );
            if ( !b )
                toRemove.push( g );
        });
        _.forEach( toRemove, function(g) {
            g.destroy();
            _.pull( self.dataGunList, g );
        });
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

    public getIsAlive() : boolean {
        return this.dataGunList.length > 0;
    }

    public getTargetPoint( _source : Phaser.Geom.Point ) : Phaser.Geom.Point {
        var MULTI = 10; 
        var x = ( Math.random() * this.dataRect.width + this.dataRect.x - _source.x ) * MULTI;
        var y = ( Math.random() * this.dataRect.height + this.dataRect.y - _source.y ) * MULTI;
        return new Phaser.Geom.Point( _source.x + x, _source.y + y );
    }
}