import "phaser";
import * as _ from 'lodash';
import { FkBaseDestructibleObject, FkBaseDstrGridData } from "./fkbasedestructibleobject";
import { GameData } from "../game/objects/gamedata";
import { EventEntityUpdate } from "../game/events/evententityupdate";

export class FkDstrGridData extends FkBaseDstrGridData {
    public dataIsVisible : boolean;

    constructor(){
        super( "FkDstrGridData", [ "dataIsVisible" ], [] );
    }

    protected init( _isVisible : boolean ) : FkDstrGridData {
        this.dataIsVisible = _isVisible;
        return this;
    }

    public static getStateVisible() : FkDstrGridData {
    	return new FkDstrGridData().init( true );
    }

    public static getStateHide() : FkDstrGridData {
        return new FkDstrGridData().init( false );
    }
}

export class FkDestructibleObject extends FkBaseDestructibleObject<FkDstrGridData> {
    private IS_DEBUG : boolean = true;
    private FRAME_COLOR : number = 0x00ff00;
    private FRAME_FILL_COLOR : number = 0x004400;
    private FRAME_COLOR_HIDDEN : number = 0xff0000;
    private FRAME_WIDTH : number = 1;   
    private dataRenderTexture : string = null; 
    private dataContainer: Phaser.GameObjects.Container;
    private layerGridEdge : Phaser.GameObjects.Graphics;
    private layerTexture : Phaser.GameObjects.Image;
    private debugDrawCounter : number = 0;

    constructor(){
        super( "FkDestructibleObject", ["dataRenderTexture"], [] );
    }

	public init( _container: Phaser.GameObjects.Container, _posX : number, _posY : number, 
		_maxWidth : number, _maxHeight : number, _renderTexture : string = null ) {
        this.dataContainer = _container;
    	this.baseInit( _posX, _posY, _maxWidth, _maxHeight,
	    	( _rect, _data ) => { this.render( _rect, _data ); }, 
	    	FkDstrGridData.getStateVisible()  );
        this.afterUnserializeInit();
        return this;
	}

    public kill(){
        super.kill();
        if ( this.layerGridEdge ) {
            this.layerGridEdge.destroy();
            this.layerGridEdge = null;
        }
        if ( this.layerTexture ) {
            this.layerTexture.destroy();
            this.layerTexture = null;
        }
    }

    public afterUnserializeInit() {
        if ( this.dataRenderTexture != null ) {
            this.layerGridEdge = GameData.inst.make.graphics({
                x: this.dataPos.x,
                y: this.dataPos.y
            });
            this.layerTexture = GameData.inst.make.image({
                x: this.dataPos.x, 
                y: this.dataPos.y, 
                texture: this.dataRenderTexture 
            });
            this.layerTexture.setMask( this.layerGridEdge.createGeometryMask() );
            this.dataContainer.add( this.layerTexture );
        }
        else {
            this.layerGridEdge = GameData.inst.make.graphics({
                x: this.dataPos.x,
                y: this.dataPos.y
            });
            this.dataContainer.add( this.layerGridEdge );
        }
    }

    public drawDstrObject() {
        this.layerGridEdge.clear();
        this.debugDrawCounter = 0;
        this.draw( ( _rect, _data ) => { this.render( _rect, _data ); } );
        EventEntityUpdate.Manager.notify( new EventEntityUpdate() );
        // console.log( "Draw: " + this.debugDrawCounter + " rects" );
    }

    private render(  _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) {
        if ( this.dataRenderTexture != null ) {
            this.renderTexture( _rect, _data );
            return;
        }
        this.renderFrame( _rect, _data );
        return;
    }

    private renderFrame( _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) : void {
        if ( _data.dataIsVisible ) {
            this.debugDrawCounter++;
            this.layerGridEdge.fillStyle( this.FRAME_FILL_COLOR );
            this.layerGridEdge.fillRectShape( _rect );
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR, 1);
            this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );
        }
        else {
            if ( this.IS_DEBUG ) {
                this.debugDrawCounter++;
                this.layerGridEdge.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR_HIDDEN, 1);
                this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );
            }
        }
    }

    private renderTexture( _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) : void {
        if ( _data.dataIsVisible ) {
            this.debugDrawCounter++;
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR, 1);
            this.layerGridEdge.fillStyle(this.FRAME_FILL_COLOR, 1 );
            this.layerGridEdge.fillRect( _rect.x, _rect.y, _rect.width, _rect.height );
        }
    }

    public static firstCollidePointForMovingPointToDstrObjectList( _objList : FkDestructibleObject[], _p1 : Phaser.Geom.Point, _p2 : Phaser.Geom.Point, _sData : FkDstrGridData ) : Phaser.Geom.Point {
        var min_len = Number.MAX_VALUE;
        var collidePoint = null;
        _objList.forEach( function(obj : FkDestructibleObject) {
            var pp = obj.collisionWithMovingPoint( _p1, _p2, _sData );
            if ( pp != null ) {
                var len = (pp.x - _p1.x)*(pp.x - _p1.x) + (pp.y - _p1.y)*(pp.y - _p1.y);
                if ( min_len > len ) {
                    collidePoint = pp;
                    min_len = len;
                }
            }
        });
        return collidePoint;
    }
}