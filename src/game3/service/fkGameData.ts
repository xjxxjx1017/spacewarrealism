import 'phaser';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../controller/panel-edit-ship";

export class FkGameData {
    private BRUSH_NORMAL : string = "BRUSH_NORMAL";
    private BRUSH_ERASE : string = "BRUSH_ERASE";
	private dataGame : Phaser.Scene;
    private dataShip1 : FkDestructibleObject;
    private uiEditorShip : PanelEditShip;

	private static _inst:FkGameData = null;
	public static inst():FkGameData {
		if ( this._inst == null )
			this._inst = new FkGameData();
		return this._inst;
	}

	private constructor() {}

	public init( _game : Phaser.Scene ) : Phaser.Scene {
		this.dataGame = _game;
        this.uiEditorShip = new PanelEditShip(
            this.BRUSH_NORMAL,
            this.BRUSH_ERASE );
		return this.dataGame;
	}

	public run() {
        var self = this;

		this.dataShip1 = new FkDestructibleObject( this.dataGame, 30, 30, 200, 250, null );
		this.dataShip1.drawDstrObject();

		this.initBrush();
	}

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
    	switch ( self.uiEditorShip.out.dataBrushType ) {
    		case self.BRUSH_NORMAL:
    			self.dataShip1.modifyByCircle( 
    				new Phaser.Geom.Circle( _p.x, _p.y, self.uiEditorShip.out.dataBrushSize),
    				FkDstrGridData.getStateVisible() );
				self.dataShip1.drawDstrObject();
    			break;
    		case self.BRUSH_ERASE:
    			self.dataShip1.modifyByCircle( 
    				new Phaser.Geom.Circle( _p.x, _p.y, self.uiEditorShip.out.dataBrushSize),
    				FkDstrGridData.getStateHide() );
				self.dataShip1.drawDstrObject();
    			break;
    		default:
    			console.log( "Brush not found." );
    			break;
    	}
    }
}