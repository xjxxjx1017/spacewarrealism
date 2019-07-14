import {FkUtil, Ship, FkDstrGridData, EventAttack, GameData} from "../importall";

export class Bullet {
	private dataIsAlive : Boolean;
    public dataContainer : any;

	public constructor() {}

	public kill() {
		this.dataIsAlive = false;
        if ( this.dataContainer != null ){
            this.dataContainer.destroy();
            this.dataContainer = null;
        }
	}

	public init( _pos : Phaser.Geom.Point, dirV : Phaser.Geom.Point ) {
        var self = this;
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
		return this;
	}
	
	public getPos() : Phaser.Geom.Point{
		return Phaser.Geom.Rectangle.GetCenter( this.dataContainer.getBounds() );
	}

	public update() {
		if ( this.dataIsAlive )
			FkUtil.debugDrawPoint( this.getPos(), 5 );
	}

	public attack( _target : Ship, _strength: number ) {
		if ( !this.dataIsAlive )
			return;
		var self = this;
		EventAttack.Manager.notify( new EventAttack( function(){ 
			self.kill(); 
		}, this.getPos(), 20 ) );
	}
}