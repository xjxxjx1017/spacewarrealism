import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../ui-components/panel-edit-ship";
import {Ship} from "./ship";

export class GameData {
	private dataGame : Phaser.Scene;
    private dataShipList : Ship[];
    private uiEditorShip : PanelEditShip;

	public constructor( _game : Phaser.Scene ){
		this.dataGame = _game;
	}

	public run() {
        var self = this;

        var shipData = [
            new Phaser.Geom.Rectangle( 15, 15, 200, 200 ),
            new Phaser.Geom.Rectangle( 100 + 15 + 300, 15, 200, 200 ) ];

        this.dataShipList = [];
        _.forEach( shipData, function(d){
            var ship = new Ship( self.dataGame, d );
            self.dataShipList.push( ship );
        })

        this.uiEditorShip = new PanelEditShip(
            self.dataGame, self.dataShipList );
	}
}