import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../ui-components/panel-edit-ship";
import {EventShipBrush, EBrushType} from "../events/eventshipbrush";
import {Gun} from "../objects/gun";
import {EventStampType, EStampType} from "../events/eventplacestamp";
import {EventHpChanged} from "../events/eventhpchanged";
import {EventEntityUpdate} from "../events/evententityupdate";
import {FkSerializable} from "../../components/fkserializable";
import { GameData } from "./gamedata";

export class Ship extends FkSerializable {
    public dataRect : Phaser.Geom.Rectangle;
    public dataShipEntity : FkDestructibleObject;
    private dataGunList : Gun[];
    public dataContainer : Phaser.GameObjects.Container;
    private dataPlayerControl: boolean;

    public constructor(){
        super( "Ship", ["dataRect", "dataShipEntity", "dataGunList"], ["dataShipEntity", "dataGunList"] );
    }

	public init( _rect : Phaser.Geom.Rectangle, _playerControl: boolean ) {
        this.dataRect = _rect;
        this.dataContainer = GameData.inst.add.container( 0, 0 );
        if ( _playerControl ){
            // GameData.inst.matter.add.gameObject( this.dataContainer, null );
            var aa = GameData.inst.matter.add.image(100, 100, 'red_turret');
            GameData.inst.cameras.main.startFollow(aa, true, 0.05, 0.05, -aa.width/2, -aa.height/2);
            //GameData.inst.cameras.main.startFollow(this.dataRect, true, 0.05, 0.05, -this.dataRect.width/2, -this.dataRect.height/2);
        }
        // Init ship body entity and events
        this.dataShipEntity = new FkDestructibleObject().init( this.dataContainer, _rect.x, _rect.y, 
            _rect.width, _rect.height, null );
        // Init guns on ship
        this.dataGunList = [];
        this.afterUnserializeInit();

        return this;
	}

    public kill(){
        super.kill();
        EventShipBrush.Manager.detach( this );
        EventStampType.Manager.detach( this );
        EventEntityUpdate.Manager.detach( this );
    }

    public afterUnserializeInit(){
        var self = this;
        // Init events
        EventShipBrush.Manager.attach( this, (id,evt)=> { self.onBrushDraw( evt ); } );
        EventStampType.Manager.attach( this, (id,evt)=> { self.onPlaceStamp( evt ); } );
        EventEntityUpdate.Manager.attach( this, (id,evt)=> { 
            if ( this == id ) 
                self.onEntityUpdate( evt ); 
        });
        // Show Object
        this.dataShipEntity.drawDstrObject();
    }

    public getHp() : number {
        return Math.floor( this.dataShipEntity.area( function(node : FkDstrGridData) : boolean { 
                return node.dataIsVisible;
            }) * 100 );
    }

    private onEntityUpdate( evt ) {
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
                var g = new Gun().init( new Phaser.Geom.Point( _evt.pos.x, _evt.pos.y ) );
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