import { FkBaseDestructibleObject, FkBaseDstrGridData } from "../fkbasedestructibleobject";
import { Lodash as _, EventEntityUpdate, GameData, FkDestructibleObject, FkDstrGridData} from "../../game/importall";

class RenderTextureConfig {
    public posX : number;
    public posY : number;
    public renderTexture : string = null;
}

export class RenderTexture {
    private IS_DEBUG : boolean = true;
    private FRAME_COLOR : number = 0x00fffc;
    private FRAME_FILL_COLOR : number = 0xFFD300;
    private FRAME_COLOR_HIDDEN : number = 0xff0000;
    private FRAME_WIDTH : number = 1.2;   
    private dataContainer: Phaser.GameObjects.Container;
    private layerGridEdge : Phaser.GameObjects.Graphics;
    private layerTexture : Phaser.GameObjects.Image;
    private config : RenderTextureConfig;
    private debugDrawCounter : number = 0;

    public kill(){
        if ( this.layerGridEdge ) {
            this.layerGridEdge.destroy();
            this.layerGridEdge = null;
        }
        if ( this.layerTexture ) {
            this.layerTexture.destroy();
            this.layerTexture = null;
        }
    }

    public getObjectData( info: any, context: any ): any  {
        info["config_renderTexture"] = this.config.renderTexture;
        info["config_posX"] = this.config.posX;
        info["config_posY"] = this.config.posY;
        return info;
    }

    public constructFromObjectData( info: any, context: any ): any {
        this.dataContainer = context.dataContainer;
        this.config = {
            renderTexture: info.renderTexture,
            posX: info.posX,
            posY: info.posY
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
            this.layerTexture = GameData.inst.make.image({
                x: this.config.posX,
                y: this.config.posY,
                texture: this.config.renderTexture 
            });
            this.layerTexture.setMask( this.layerGridEdge.createGeometryMask() );
            this.dataContainer.add( this.layerTexture );
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
        if ( this.config.renderTexture != null ) {
            this.renderTexture( _rect, _data );
            return;
        }
        // this.renderFrame( _rect, _data );
        this.renderWireFrame( _rect, _data );
        return;
    }

    public renderEnd() {
        EventEntityUpdate.Manager.notify( new EventEntityUpdate() );
        // console.log( "Draw: " + this.debugDrawCounter + " rects" );
    }

    private renderWireFrame( _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) : void {
        if ( _data.dataIsVisible ) {
            this.debugDrawCounter++;
            var p1 = _rect.width;
            var p2 = 0.6;
            var alpha = p1 > 20 ? 1 : p1 / 20;
            var fillAlpha = (1.1 - alpha) * p2;
            var lineAlpha = p1 < 20 ? 0 : p2 * p1 / 30;
            this.layerGridEdge.fillStyle( this.FRAME_COLOR, fillAlpha );
            this.layerGridEdge.fillRectShape( _rect );
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR, lineAlpha);
            this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );
        }
    }

    private renderFill( _rect : Phaser.Geom.Rectangle, _data : FkDstrGridData ) : void {
        if ( _data.dataIsVisible ) {
            this.debugDrawCounter++;
            this.layerGridEdge.fillStyle( this.FRAME_FILL_COLOR );
            this.layerGridEdge.fillRectShape( _rect );
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH, this.FRAME_FILL_COLOR, 1);
            this.layerGridEdge.strokeRect( _rect.x, _rect.y, _rect.width, _rect.height );
        }
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
}