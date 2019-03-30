import "phaser";

export class Gun {
	private dataPos : Phaser.Geom.Point;
	private dataIsAlive : Boolean;

	public constructor( _pos : Phaser.Geom.Point ) {
		this.dataPos = _pos;
		this.dataIsAlive = true;
	}
}