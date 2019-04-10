import "phaser";
import {Laser} from "./laser";
import {Ship} from "./ship";

export class Gun {
	public static IMAGE_RED_TURRET : string = "red_turret";
	private dataGame : Phaser.Scene;
	private dataPos : Phaser.Geom.Point;
	private dataIsAlive : Boolean;
	private dataSprite : Phaser.GameObjects.Sprite;
	private dataWeapon : Laser;

	public constructor( _game : Phaser.Scene, _pos : Phaser.Geom.Point ) {
		this.dataGame = _game;
		this.dataPos = _pos;
		this.dataIsAlive = true;

		var cfg : SpriteConfig = { 
			key: Gun.IMAGE_RED_TURRET,
			x: _pos.x, y: _pos.y,
			scale: {
				x: 0.2, y: 0.2
			}
		}
		this.dataSprite = this.dataGame.make.sprite( cfg, true );
		this.dataWeapon = new Laser();
	}

	public attack( _target : Ship ) {
		this.dataWeapon.attack( this.dataPos, _target ) ;
	}
}