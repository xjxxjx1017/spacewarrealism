import "phaser";
import {Ship} from "./ship";
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {Effect} from "../effect/Effect";
import {FkSerializable} from "../../components/fkserializable";
import {GameData} from "./gamedata";

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
        var targetP = _target.getTargetPoint( this.dataPos );
		_target.attackedByLine( this.dataPos, targetP, _strength )
        Effect.createShootEffect( this.dataPos, targetP );
	}
}