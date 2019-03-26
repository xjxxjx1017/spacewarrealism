import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../controller/panel-edit-ship";
import {FkShip} from "./fkship";

export class FkGameData {
    private BRUSH_NORMAL : string = "BRUSH_NORMAL";
    private BRUSH_ERASE : string = "BRUSH_ERASE";
	private dataGame : Phaser.Scene;
    private dataShipList : FkShip[];
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
            new Phaser.Geom.Rectangle( 15, 15, 200, 200 ),
            new Phaser.Geom.Rectangle( 100 + 15 + 300, 15, 200, 200 ) ];

        this.dataShipList = [];
        _.forEach( shipData, function(d){
            var ship = new FkShip( self.dataGame, d );
            self.dataShipList.push( ship );
        })

        this.uiEditorShip = new PanelEditShip(
            self.dataGame, self.dataShipList,
            this.BRUSH_NORMAL,
            this.BRUSH_ERASE );
	}
}