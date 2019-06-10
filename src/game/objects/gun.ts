import {FkSerializable, FkDestructibleObject, FkDstrGridData, Ship, Effect, GameData} from "../importall";

export class Gun extends FkSerializable{
	public static IMAGE_RED_TURRET : string = "red_turret";
	public dataPos : Phaser.Geom.Point;
	private dataIsAlive : Boolean;
	private dataSprite : Phaser.GameObjects.Sprite;
    public dataContainer : any;
	private stateImage: string;

	public constructor() {
		super( "Gun", ["dataPos", "dataIsAlive"], [] );
	}

	public init( _container : any, _pos : Phaser.Geom.Point ) {
		this.dataPos = _pos;
		this.dataIsAlive = true;
		this.dataContainer = _container;
		this.afterUnserializeInit();
		return this;
	}

	public kill(){
		super.kill();
		if ( this.dataSprite ){
			this.dataSprite.destroy();
			this.dataSprite = null;
		}
	}

	public afterUnserializeInit(){
		var cfg : SpriteConfig = { 
			key: Gun.IMAGE_RED_TURRET,
			x: this.dataPos.x, y: this.dataPos.y,
			scale: {
				x: 0.5, y: 0.5
			}
		}
		this.dataSprite = GameData.inst.make.sprite( cfg, false );
		this.dataContainer.add( this.dataSprite );
	}

	public destroy() {
		this.dataSprite.destroy();
		this.dataSprite = null;
	}

	public attack( _target : Ship, _strength: number ) {
		var c1: Phaser.GameObjects.Container = this.dataContainer;
		var c2: Phaser.GameObjects.Container = _target.dataContainer;
		var p1 = new Phaser.Geom.Point();
		c1.getWorldTransformMatrix().transformPoint( this.dataPos.x, this.dataPos.y, p1 );
		// var p2: Phaser.Geom.Point = c2.getBounds().getRandomPoint();
		var p2: Phaser.Geom.Point = new Phaser.Geom.Point( c2.x, c2.y );// new Phaser.Geom.Point( c2.getBounds().centerX, c2.getBounds().centerY );
		// p2 = GameData.inst.cameras.main.getWorldPoint( p2.x, p2.y );
		// c1.getWorldTransformMatrix().transformPoint( r1.x, r1.y, r1 );
		// c2.getWorldTransformMatrix().transformPoint( r2.x, r2.y, r2 );
		// _target.attackedByLine( p1, p2, _strength ); 
		Effect.createShootEffect( p1, p2 );
	}
}