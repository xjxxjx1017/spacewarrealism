import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../controller/panel-edit-ship";

export class FkGameData {
    private BRUSH_NORMAL : string = "BRUSH_NORMAL";
    private BRUSH_ERASE : string = "BRUSH_ERASE";
	private dataGame : Phaser.Scene;
    private dataShipList : FkDestructibleObject[];
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
		return this.dataGame;
	}

	public run() {
        var self = this;

        var shipData = [
            new Phaser.Geom.Rectangle( 15, 15, 100, 125 ),
            new Phaser.Geom.Rectangle( 100 + 15 + 200, 15, 100, 125 ) ];

        this.dataShipList = [];
        _.forEach( shipData, function(d){
            var ship = new FkDestructibleObject( self.dataGame, d.x, d.y, 
                d.width, d.height, null );
            ship.drawDstrObject();
            self.dataShipList.push( ship );
        })

        this.uiEditorShip = new PanelEditShip(
            shipData[0].width + shipData[0].x + 15, 15,
            this.BRUSH_NORMAL,
            this.BRUSH_ERASE );

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
    			self.dataShipList[0].modifyByCircle( 
    				new Phaser.Geom.Circle( _p.x, _p.y, self.uiEditorShip.out.dataBrushSize),
    				FkDstrGridData.getStateVisible() );
				self.dataShipList[0].drawDstrObject();
    			break;
    		case self.BRUSH_ERASE:
    			self.dataShipList[0].modifyByCircle( 
    				new Phaser.Geom.Circle( _p.x, _p.y, self.uiEditorShip.out.dataBrushSize),
    				FkDstrGridData.getStateHide() );
				self.dataShipList[0].drawDstrObject();
    			break;
    		default:
    			console.log( "Brush not found." );
    			break;
    	}
    }
}