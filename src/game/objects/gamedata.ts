import 'phaser';
import * as _ from 'lodash';
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {PanelEditShip} from "../ui-components/panel-edit-ship";
import "../ui-components/panel-edit-ship-vue";
import {PanelInformation, PanelInformationUnit} from "../ui-components/panel-information";
import {PanelGameState} from "../ui-components/panel-game-state";
import "../ui-components/panel-information-vue";
import {Ship} from "./ship";
import {FkWithMouse} from "../ui-components/fkwithmouse";
import {EventHpChanged} from "../events/eventhpchanged";

enum GameState {
    STATE_BATTLE,
    STATE_IDLE,
}

export class GameData {
	private dataGame : Phaser.Scene;
    public dataShipList : Ship[];
    private uiEditorShip : PanelEditShip;
    private uiInformation : PanelInformation;
    private uiGameState : PanelGameState;
    public uiWithMouse : FkWithMouse;
    private dataState : GameState = GameState.STATE_IDLE;
    private tmpAttackTimer : Phaser.Time.TimerEvent;

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

        this.uiWithMouse = new FkWithMouse( this.dataGame );
        this.uiEditorShip = new PanelEditShip( this.dataGame );

        var uiGroup = [];
        var count = 0;
        _.forEach( self.dataShipList, function(s){
            var infor = <PanelInformationUnit>{
                stateHp: s.getHp(),
                stateWidth: s.dataRect.width,
                statePosX: s.dataRect.x,
                statePosY: s.dataRect.y - 20,
                stateHeight: 18,
            };
            uiGroup.push( infor );
            // Use event to pass ship HP updates to UI
            EventHpChanged.Manager.attach( "hpupdate" + count, ( evt : EventHpChanged ) => {
                if ( s == evt.ship )
                    infor.stateHp = evt.hp;
            })
            count++;
        })
        this.uiInformation = new PanelInformation( this.dataGame, uiGroup );
        this.uiGameState = new PanelGameState( this );
	}

    public changeStateToBattle() {
        var self = this;
        if ( this.tmpAttackTimer ) {
            this.tmpAttackTimer.remove(()=>{});
            this.tmpAttackTimer = null;
        }
        // Auto attack every seconds
        this.tmpAttackTimer = this.dataGame.time.addEvent({ delay: 1000, callback: ()=> {
            self.dataShipList[0].attack( self.dataShipList[1] );
            self.dataShipList[1].attack( self.dataShipList[0] );
        }, repeat: 40 });
    }

    public changeStateToIdle() {
        if ( this.tmpAttackTimer ) {
            this.tmpAttackTimer.remove(()=>{});
            this.tmpAttackTimer = null;
        }
    }

    public reset() {
        console.log( "reset" );
    }
}