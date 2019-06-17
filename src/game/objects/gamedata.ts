import {Lodash as _, FkDestructibleObject, FkDstrGridData, FkQuadTree, FkScene, Ship, Gun, FkWithMouse, EventHpChanged, EventCheckCondition, EnumCheckCondition, FkFactory, PanelEditShip, PanelInformation, PanelInformationUnit, PanelGameState} from "../importall";

enum GameState {
    STATE_BATTLE,
    STATE_IDLE,
}

export class GameData {
    public static inst: Phaser.Scene;
	private dataGame : Phaser.Scene;
    public dataShipList : Ship[];
    private uiEditorShip : PanelEditShip;
    private uiInformation : PanelInformation;
    private uiGameState : PanelGameState;
    public uiWithMouse : FkWithMouse;
    private dataState : GameState = GameState.STATE_IDLE;
    private tmpAttackTimer : Phaser.Time.TimerEvent;

	public constructor( _game : Phaser.Scene ){
        GameData.inst = _game;
		this.dataGame = _game;    
    }

    public save() {
        // Save game - serialize - ships
        var saveString = {
            ShipA: this.dataShipList[0].getObjectData( {}, this ),
            ShipB: this.dataShipList[1].getObjectData( {}, this ),
        };
        return JSON.stringify( saveString );
    }

    public load( file ) {
        // Load game - parse from file
        var saveObj = JSON.parse( file );
        // Load game - create - ships
        this.dataShipList[0].constructFromObjectData( saveObj.ShipA, this );
        this.dataShipList[1].constructFromObjectData( saveObj.ShipB, this );
    }

	public run() {
        var self = this;
        // Initialize Physics
        this.dataGame.matter.world.setBounds( 0, 0, 800, 400 );

        // Create - ships
        var shipData = [
            new Phaser.Geom.Rectangle( 15, 15, 200, 200 ),
            new Phaser.Geom.Rectangle( 100 + 15 + 300, 15, 200, 200 ) ];
        this.dataShipList = [];
        _.forEach( shipData, function(d){
            var ship = new Ship().init( d, self.dataShipList.length == 0 );
            self.dataShipList.push( ship );
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
        _.forEach( this.dataShipList, function( s:Ship ) {
            s.update( time, delta );
        })
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
            this.tmpAttackTimer.remove(()=>{});
            this.tmpAttackTimer = null;
        }
        // Auto attack every seconds
        this.tmpAttackTimer = this.dataGame.time.addEvent({ delay: 1000, callback: ()=> {
            self.dataShipList[0].attack( self.dataShipList[1] );
            self.dataShipList[1].attack( self.dataShipList[0] );
            EventCheckCondition.Manager.notify( EnumCheckCondition.CONDITION_GAME_WIN );
        }, repeat: 40 });
    }

    public changeStateToIdle() {
        if ( this.tmpAttackTimer ) {
            this.tmpAttackTimer.remove(()=>{});
            this.tmpAttackTimer = null;
        }
    }

    public reset() {
        this.load( FkScene.SCENE_START );
    }
}