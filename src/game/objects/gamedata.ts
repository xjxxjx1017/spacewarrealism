import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../ui-components/panel-edit-ship";
import "../ui-components/panel-edit-ship-vue";
import {Ship} from "./ship";
import {FkWithMouse} from "../../components/fkwithmouse";
import {EventWithMouse} from "../events/eventwithmouse";

export class GameData {
	private dataGame : Phaser.Scene;
    private dataShipList : Ship[];
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

        this.uiEditorShip = new PanelEditShip( this.dataGame );
        this.uiWithMouse = new FkWithMouse( this.dataGame );
        EventWithMouse.Manager.attach( this, ( _evt : EventWithMouse ) => { 
                _evt.isActive ? 
                self.uiWithMouse.LoadImage( _evt.src ) : self.uiWithMouse.UnloadImage(); 
        } );

        this.dataGame.input.on( "pointerdown", function( _p ) {
            EventWithMouse.Manager.notify( new EventWithMouse( 
                EventWithMouse.IMAGE_RED_TURRET ) );
        })
	}
}