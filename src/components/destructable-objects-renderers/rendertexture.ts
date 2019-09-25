import { FkBaseDestructibleObject, FkBaseDstrGridData } from "../fkbasedestructibleobject";
import { Lodash as _, EventEntityUpdate, GameData, FkDestructibleObject, FkDstrGridData} from "../../game/importall";

class RenderTextureConfig {
    public posX : number;
    public posY : number;
    public renderTexture : string = null;
    public renderType : RenderType;
}

export enum RenderType {
    RENDER_TYPE_BigHollowOthersSolid,
    RENDER_TYPE_BigTextureOthersSolid,
}

export class RenderTexture {
    private IS_DEBUG : boolean = true;
    private COLOR_AQUA : number = 0x00fffc;
    private COLOR_GOLD : number = 0xFFD300;
    private COLOR_RED : number = 0xff0000;
    private COLOR_SADDLE_BROWN : number = 0xD97400;
    private FRAME_WIDTH_WIRE : number = 1.2;   
    private FRAME_WIDTH_WIRE_WIDE : number = 1.5;   
    private dataContainer: Phaser.GameObjects.Container;
    private layerGridEdge : Phaser.GameObjects.Graphics;
    private config : RenderTextureConfig;
    private debugDrawCounter : number = 0;

    public kill(){
        if ( this.layerGridEdge ) {
            this.layerGridEdge.destroy();
            this.layerGridEdge = null;
        }
    }

    public getObjectData( info: any, context: any ): any  {
        info["renderTexture"] = this.config.renderTexture;
        info["posX"] = this.config.posX;
        info["posY"] = this.config.posY;
        info["renderType"] = this.config.renderType;
        return info;
    }

    public constructFromObjectData( info: any, context: any ): any {
        this.dataContainer = context.dataContainer;
        this.config = {
            renderTexture: info.renderTexture,
            posX: info.posX,
            posY: info.posY,
            renderType: info.renderType
        }
        this.initAfter();
        return this;
    }

	public init( container: Phaser.GameObjects.Container, config : RenderTextureConfig ) {
        this.dataContainer = container;
        this.config = config;
        this.initAfter();
        return this;
	}

    public initAfter() {
        if ( this.config.renderTexture != null ) {
            this.layerGridEdge = GameData.inst.make.graphics({
                x: this.config.posX,
                y: this.config.posY
            });
            this.dataContainer.add( this.layerGridEdge );
        }
        else {
            this.layerGridEdge = GameData.inst.make.graphics({
                x: this.config.posX,
                y: this.config.posY
            });
            this.dataContainer.add( this.layerGridEdge );
        }
    }

    public renderBegin() {
        this.layerGridEdge.clear();
        this.debugDrawCounter = 0;
    }

    public render(  _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) {
        switch( this.config.renderType ){
            case RenderType.RENDER_TYPE_BigHollowOthersSolid:
                this.renderBigHollowOthersSolidWithFrame( _rect, _data );
                break;
            case RenderType.RENDER_TYPE_BigTextureOthersSolid:
                this.renderBigTextureOthersSolid( _rect, _data );
                break;
            default:
                this.renderFrameDebug( _rect, _data );
                break;
        }
        return;
    }

    public renderEnd() {
        EventEntityUpdate.Manager.notify( new EventEntityUpdate() );
        // console.log( "Draw: " + this.debugDrawCounter + " rects" );
    }

    private renderBigHollowOthersSolidWithFrame( _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) : void {
        if ( _data.dataIsVisible ) {
            this.debugDrawCounter++;
            var p1 = _rect.width;
            var p2 = 0.6;
            var alpha = p1 > 20 ? 1 : p1 / 20;
            var fillAlpha = (1.1 - alpha) * p2;
            var lineAlpha = p1 < 20 ? 0 : p2 * p1 / 30;
            this.layerGridEdge.fillStyle( this.COLOR_AQUA, fillAlpha );
            this.layerGridEdge.fillRectShape( _rect );
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH_WIRE, this.COLOR_AQUA, lineAlpha);
            this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );
        }
    }

    private renderBigTextureOthersSolid( _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) : void {
        if ( _data.dataIsVisible ) {
            this.debugDrawCounter++;
            var p1 = _rect.width;
            var p2 = 0.6;
            var alpha = p1 > 20 ? 1 : p1 / 20;
            var fillAlpha = (1.1 - alpha) * p2;
            var lineAlpha = p1 < 20 ? 0 : p2 * p1 / 30;
            this.layerGridEdge.fillStyle( this.COLOR_SADDLE_BROWN, fillAlpha );
            this.layerGridEdge.fillRectShape( _rect );
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH_WIRE_WIDE, this.COLOR_SADDLE_BROWN, lineAlpha);
            this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );
        }
        /*
        if ( !_data.dataIsVisible )
            return;
        this.debugDrawCounter++;
        var p1 = _rect.width;
        var p2 = 0.6;
        var ww = 3;
        var www = 5;
        var alpha = p1 > ww ? 1 : p1 / ww;
        var fillAlpha = (1.1 - alpha) * p2;
        var lineAlpha = p1 < ww ? 0 : p2 * p1 / www;
        this.layerGridEdge.fillStyle( this.COLOR_SADDLE_BROWN, fillAlpha );
        this.layerGridEdge.fillRectShape( _rect );
        
        this.layerGridEdge.lineStyle(this.FRAME_WIDTH_WIRE_WIDE, this.COLOR_SADDLE_BROWN, lineAlpha);
        this.layerGridEdge.beginPath();
        var sum = 0;
        while( sum <= _rect.width ){
            var w = Math.random() * 3 + 5;
            if ( sum + w > _rect.width )
                break;
            this.layerGridEdge.moveTo( _rect.x + sum, _rect.y );
            this.layerGridEdge.lineTo( _rect.x + sum + w, _rect.y + _rect.height );
            sum += w;
        }
        this.layerGridEdge.moveTo( _rect.x + sum, _rect.y );
        this.layerGridEdge.lineTo( _rect.x + _rect.width, _rect.y + _rect.height );
        this.layerGridEdge.closePath();
        this.layerGridEdge.strokePath();
        this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );*/
    }

    private renderFrameDebug( _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) : void {
        if ( _data.dataIsVisible ) {
            this.debugDrawCounter++;
            this.layerGridEdge.fillStyle( this.COLOR_GOLD );
            this.layerGridEdge.fillRectShape( _rect );
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH_WIRE, this.COLOR_AQUA, 1);
            this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );
        }
        else {
            if ( this.IS_DEBUG ) {
                this.debugDrawCounter++;
                this.layerGridEdge.lineStyle(this.FRAME_WIDTH_WIRE, this.COLOR_RED, 1);
                this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );
            }
        }
    }
}