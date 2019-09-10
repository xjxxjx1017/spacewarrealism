import { FkBaseDestructibleObject, FkBaseDstrGridData } from "./fkbasedestructibleobject";
import { Lodash as _, EventEntityUpdate, GameData} from "../game/importall";
import { RenderTexture, RenderType } from "./destructable-objects-renderers/rendertexture";

export class FkDstrGridData extends FkBaseDstrGridData {
    public dataIsVisible : boolean;

    constructor(){
        super();
    }

    public kill() {}

    public getObjectData( info: any, context: any ): any {
        info["dataIsVisible"] = this.dataIsVisible;
        return info
    }

    public constructFromObjectData( info: any, context: any ): any {
        this.dataIsVisible = info.dataIsVisible;
        return this;
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
    private dataContainer: Phaser.GameObjects.Container;
    private renderer1 : RenderTexture;

    constructor(){
        super( FkDstrGridData );
        this.renderer1 = new RenderTexture();
    }

    public kill(){
        super.kill();
        this.renderer1.kill();
    }

    public getObjectData( info: any, context: any ): any  {
        info["renderer1"] = this.renderer1.getObjectData( {}, context );
        super.getObjectData( info, context );
        return info;
    }

    public constructFromObjectData( info: any, context: any ): any {
        super.constructFromObjectData( info, context );
        this.renderer1.constructFromObjectData( info.renderer1, context );
        return this;
    }

	public init( _container: Phaser.GameObjects.Container, _posX : number, _posY : number, 
		_maxWidth : number, _maxHeight : number, _renderType : RenderType, _renderTexture : string = null ) {
    	super.baseInit( _posX, _posY, _maxWidth, _maxHeight, FkDstrGridData.getStateVisible() );
        this.dataContainer = _container;
        this.renderer1.init( _container, {
            posX: _posX,
            posY: _posY,
            renderTexture: _renderTexture,
            renderType: _renderType
        })
        return this;
	}

    public drawDstrObject() {
        var self = this;
        var renderer = this.renderer1;
        this.renderer1.renderBegin();
        this.draw( ( _rect, _data ) => { renderer.render( _rect, _data ); } );
        this.renderer1.renderEnd();
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