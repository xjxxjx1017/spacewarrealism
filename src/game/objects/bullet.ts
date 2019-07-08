import {FkUtil, Ship, FkDstrGridData, EventAttack} from "../importall";

export class Bullet {
	private dataIsAlive : Boolean;
	private dataPos : Phaser.Geom.Point;

	public constructor() {}

	public kill() {
		this.dataIsAlive = false;
	}

	public init( _pos : Phaser.Geom.Point ) {
		this.dataPos = _pos;
		this.dataIsAlive = true;
		return this;
	}

	public update() {
		if ( this.dataIsAlive )
			FkUtil.debugDrawPoint( this.dataPos, 5 );
	}

	public attack( _target : Ship, _strength: number ) {
		if ( !this.dataIsAlive )
			return;
		var self = this;
		EventAttack.Manager.notify( new EventAttack( ()=>{ 
			self.kill(); 
		}, this.dataPos, 20 ) );
	}
}