import 'phaser';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";

export class FkGameData {
	private dataGame : Phaser.Scene;
    private dataShip1 : FkDestructibleObject;
    private BRUSH_NORMAL : string = "BRUSH_NORMAL";
    private BRUSH_ERASE : string = "BRUSH_ERASE";
    private dataBrushType : string = this.BRUSH_ERASE;
    private dataBrushRadius : number = 15;

	private static _inst:FkGameData = null;
	public static inst():FkGameData {
		if ( this._inst == null )
			this._inst = new FkGameData();
		return this._inst;
	}

	private constructor() {}

	public init( _game : Phaser.Scene ) : Phaser.Scene {
		this.dataGame = _game;
		return this.dataGame;
	}

	public run() {
        var self = this;

		this.dataShip1 = new FkDestructibleObject( this.dataGame, 30, 30, 500, 250, null );
		this.dataShip1.drawDstrObject();
		this.dataBrushType = this.BRUSH_ERASE; 

		this.initBrush();
        // button
        // var cB1 = this.CreateButton( 1, 'overlay_ship', () => {
        //     self.layerGridCanvas.SetIsEdit( !this.layerGridCanvas.GetIsEdit() );
        // });
        // var cB2 = this.CreateButton( 2, 'overlay_grass', () => { self.UseBrushNormal() } );
        // var cB3 = this.CreateButton( 3, 'overlay_nohuman', () => { self.UseBrushEraser() } );
	}

    // private CreateButton( _seq: number, _overlay: string, _onClick: () => void ) : FkImageButton {
    //     return new FkImageButton( this.dataGame, 550, 50 + (64 + 5) * (_seq - 1), 
    //         'button_normal',  'button_hover',  'button_down', 
    //         _overlay, _onClick );
    // }

    private initBrush() {
        var self = this;
        this.dataGame.input.on( "pointerdown", function( _p ) {
        	self.onBrushDraw( _p );
        })
        this.dataGame.input.on( "pointermove", function( _p ) {
        	if ( self.dataGame.input.mousePointer.isDown ) {
        		self.onBrushDraw( _p );
        	}
        })
    }

    private onBrushDraw( _p : Phaser.Geom.Point ) {
        var self = this;
    	switch ( self.dataBrushType ) {
    		case self.BRUSH_NORMAL:
    			self.dataShip1.modifyByCircle( 
    				new Phaser.Geom.Circle( _p.x, _p.y, self.dataBrushRadius),
    				FkDstrGridData.getStateVisible() );
				self.dataShip1.drawDstrObject();
    			break;
    		case self.BRUSH_ERASE:
    			self.dataShip1.modifyByCircle( 
    				new Phaser.Geom.Circle( _p.x, _p.y, self.dataBrushRadius),
    				FkDstrGridData.getStateHide() );
				self.dataShip1.drawDstrObject();
    			break;
    		default:
    			console.log( "Brush not found." );
    			break;
    	}
    }
}