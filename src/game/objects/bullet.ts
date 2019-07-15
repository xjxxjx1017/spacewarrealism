import {FkUtil, Ship, FkDstrGridData, EventAttack, GameData, EventGameUpdate} from "../importall";

export class Bullet {
    private id : string;
	private groupId : number;
	private dataIsAlive : Boolean;
    public dataContainer : any;

	public constructor() {
		this.id = FkUtil.generateId();
	}

	public kill() {
		this.dataIsAlive = false;
        if ( this.dataContainer != null ){
            this.dataContainer.destroy();
			this.dataContainer = null;
			EventGameUpdate.Manager.detach( this.id );
        }
	}

	public init( groupId : number, _pos : Phaser.Geom.Point, dirV : Phaser.Geom.Point ) {
		var self = this;
		this.groupId = groupId;
		this.dataIsAlive = true;
        this.dataContainer = GameData.inst.add.container( _pos.x, _pos.y );
        this.dataContainer.setAngle( 270 );
        this.dataContainer.setSize( 10, 10 );
        GameData.inst.matter.add.gameObject(this.dataContainer, {});
        this.dataContainer.setCollisionCategory( GameData.COLLIDE_NEVER );
		this.dataContainer.setFixedRotation();
		this.dataContainer.setFrictionAir(0);
		this.dataContainer.setMass(30);
		this.dataContainer.applyForce( { x: dirV.x, y: dirV.y } );
		FkUtil.debugDrawPoint( this.getPos() );
        EventGameUpdate.Manager.attach( this.id, (id,evt)=>{ self.update( evt.time, evt.delta ); } );
		return this;
	}
	
	public getPos() : Phaser.Geom.Point{
		return Phaser.Geom.Rectangle.GetCenter( this.dataContainer.getBounds() );
	}

	public update( time : number, delta : number ) {
		if ( !this.dataIsAlive )
			return;
		FkUtil.debugDrawPoint( this.getPos(), 5 );
		this.attack( 20 );
	}

	public attack( strength: number ) {
		if ( !this.dataIsAlive )
			return;
		var self = this;
		EventAttack.Manager.notify( new EventAttack( self.groupId, function(){ 
			FkUtil.debugDrawPoint( self.getPos(), 20 );
			self.kill(); 
		}, this.getPos(), strength ) );
	}
}