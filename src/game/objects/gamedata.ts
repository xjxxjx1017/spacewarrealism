import {Lodash as _, FkDestructibleObject, FkDstrGridData, FkQuadTree, FkScene, Ship, Meteorite, Gun, FkWithMouse, EventHpChanged, EventCheckCondition, EnumCheckCondition, FkFactory, PanelEditShip, PanelInformation, PanelInformationUnit, PanelGameState, EventGameUpdate, Setting} from "../importall";
import { FkUtil } from "../../components/fkutil";
import { ActionMove, eActionDurationType, eActionType } from "../actions/actionmanager";

enum GameState {
    STATE_BATTLE,
    STATE_IDLE,
}

export class GameData {
    public static COLLIDE_SHIP : any;
    public static COLLIDE_SHIP_PLAYER : any;
    public static COLLIDE_NEVER : any = 0;
    public static inst: Phaser.Scene;
    private id : string;
	private dataGame : Phaser.Scene;
    public dataShipList : Ship[];
    public meteroList : Meteorite[];
    private uiEditorShip : PanelEditShip;
    private uiInformation : PanelInformation;
    private uiGameState : PanelGameState;
    public uiWithMouse : FkWithMouse;
    private dataState : GameState = GameState.STATE_IDLE;
    private tmpAttackTimer : Phaser.Time.TimerEvent;

	public constructor( _game : Phaser.Scene ){
        this.id = FkUtil.generateId();
        GameData.inst = _game;
		this.dataGame = _game;    
    }

    public save() {
        // Save game - serialize - ships
        var saveString = {
            ShipA: this.dataShipList[0].getObjectData( {}, this ),
        };
        return JSON.stringify( saveString );
    }

    public load( file ) {
        // Load game - parse from file
        var saveObj = JSON.parse( file );
        // Load game - create - ships
        this.dataShipList[0].constructFromObjectData( saveObj.ShipA, this );
    }

	public run() {
        var self = this;
        // Initialize Physics
        this.dataGame.add.sprite(Setting.GAME_WIDTH/2, Setting.GAME_HEIGHT/2, 'background').setScale(0.5, 0.5);
        this.dataGame.add.sprite(Setting.GAME_WIDTH/2, Setting.GAME_HEIGHT/2, 'sample_overlay').setScale(0.5, 0.5);
        this.dataGame.matter.world.setBounds( 0, 0, 800, 600 );
        GameData.COLLIDE_SHIP = this.dataGame.matter.world.nextCategory();
        GameData.COLLIDE_SHIP_PLAYER = this.dataGame.matter.world.nextCategory();

        GameData.inst.cameras.main.pan( Setting.GAME_WIDTH/2, Setting.GAME_HEIGHT/2, 0 );
        GameData.inst.cameras.main.setZoom( 1 );
        GameData.inst.cameras.main.setAngle( 0 );

        // Create - ships
        var shipData = [
            new Phaser.Geom.Rectangle( 15, 15, 200, 200 ) ];
        this.dataShipList = [];
        var groupId = 1;
        _.forEach( shipData, function(d){
            var ship = new Ship().init( groupId++, d, self.dataShipList.length == 0 );
            self.dataShipList.push( ship );
        })
        var meteroData = [
            new Phaser.Geom.Rectangle( 715, 115, 50, 50 ),
            new Phaser.Geom.Rectangle( 715, 315, 50, 50 ),
            new Phaser.Geom.Rectangle( 715, 365, 50, 50 ),
            new Phaser.Geom.Rectangle( 715, 215, 50, 50 ),
            new Phaser.Geom.Rectangle( 715, 65, 50, 50 ) ];
        this.meteroList = [];
        var groupId = 1000;
        _.forEach( meteroData, function(d){
            var metero = new Meteorite().init( groupId++, d );
            self.meteroList.push( metero );
            
            metero.actionReolver.act( <ActionMove>{
                type: eActionType.ACTION_MOVE,
                durType: eActionDurationType.SUSTAIN,
                durTime: 5,
                vec1: {x: -0.1, y: 0}
            } );
        })
        // Initialize UI - mouse tracker
        this.uiWithMouse = new FkWithMouse( this.dataGame );
        // Initialize UI - editor
        this.uiEditorShip = new PanelEditShip( this.dataGame );
        // Initialize UI - ship HP bars
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
            // Attach events - pass ship HP updates to UI
            EventHpChanged.Manager.attach( "hpupdate" + count, ( id, evt : EventHpChanged ) => {
                if ( s == evt.ship )
                    infor.stateHp = evt.hp;
            })
            count++;
        })
        
        this.uiInformation = new PanelInformation( this.dataGame, uiGroup );
        // Initialize UI - game state
        this.uiGameState = new PanelGameState( this );
        // Attach events - game win/lose
        EventCheckCondition.Manager.attach( EnumCheckCondition.CONDITION_GAME_WIN, 
        (_id, _event)=>{ self.checkWiningCondition(); } );

        this.load( FkScene.SCENE_START );
	}

    public update(time: number, delta: number): void{
        EventGameUpdate.Manager.notify( new EventGameUpdate( time, delta ) );
    }

    public checkWiningCondition() {
        var gameEnd = false;
        _.forEach( this.dataShipList, function( s:Ship ) {
            if ( !s.getIsAlive() )
                gameEnd = true; 
        })
        if ( gameEnd )
            this.changeStateToIdle();
    }

    public changeStateToBattle() {
        var self = this;
        if ( this.tmpAttackTimer ) {
            this.tmpAttackTimer.remove();
            this.tmpAttackTimer = null;
        }
        // Auto attack every seconds
        this.tmpAttackTimer = this.dataGame.time.addEvent({ delay: 1000, callback: ()=> {
            // self.dataShipList[0].attack( self.dataShipList[1] );
            EventCheckCondition.Manager.notify( EnumCheckCondition.CONDITION_GAME_WIN );
        }, repeat: 40 });
    }

    public changeStateToIdle() {
        if ( this.tmpAttackTimer ) {
            this.tmpAttackTimer.remove();
            this.tmpAttackTimer = null;
        }
    }

    public reset() {
        this.load( FkScene.SCENE_START );
    }
}