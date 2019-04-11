import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../ui-components/panel-edit-ship";
import "../ui-components/panel-edit-ship-vue";
import {Ship} from "./ship";
import {FkWithMouse} from "../ui-components/fkwithmouse";

export class GameData {
	private dataGame : Phaser.Scene;
    public dataShipList : Ship[];
    private uiEditorShip : PanelEditShip;
    public uiWithMouse : FkWithMouse;

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

        // Auto attack every seconds
        var timedEvent = this.dataGame.time.addEvent({ delay: 1000, callback: ()=> {
            self.dataShipList[0].attack( self.dataShipList[1] );
            self.dataShipList[1].attack( self.dataShipList[0] );
        }, repeat: 40 });

        this.uiEditorShip = new PanelEditShip( this.dataGame );
        this.uiWithMouse = new FkWithMouse( this.dataGame );
	}
}