import "phaser";
import {Ship} from "./ship";
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";
import {Effect} from "../effect/Effect";

export class Gun {
	public static IMAGE_RED_TURRET : string = "red_turret";
	private dataGame : Phaser.Scene;
	public dataPos : Phaser.Geom.Point;
	private dataIsAlive : Boolean;
	private dataSprite : Phaser.GameObjects.Sprite;
	public constructor( _game : Phaser.Scene, _pos : Phaser.Geom.Point ) {
		this.dataGame = _game;
		this.dataPos = _pos;
		this.dataIsAlive = true;

		var cfg : SpriteConfig = { 
			key: Gun.IMAGE_RED_TURRET,
			x: _pos.x, y: _pos.y,
			scale: {
				x: 0.5, y: 0.5
			}
		}
		this.dataSprite = this.dataGame.make.sprite( cfg, true );
	}

	public destroy() {
		this.dataSprite.destroy();
		this.dataSprite = null;
	}

	public attack( _target : Ship, _strength: number ) {
        var targetP = _target.getTargetPoint( this.dataPos );
		_target.attackedByLine( this.dataPos, targetP, _strength )
        Effect.createShootEffect( this.dataGame, this.dataPos, targetP );
	}
}