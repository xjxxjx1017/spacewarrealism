import "phaser";
import {Ship} from "./ship";
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";

export class Gun {
	public static IMAGE_RED_TURRET : string = "red_turret";
	private dataGame : Phaser.Scene;
	private dataPos : Phaser.Geom.Point;
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
				x: 0.2, y: 0.2
			}
		}
		this.dataSprite = this.dataGame.make.sprite( cfg, true );
	}

	public attack( _target : Ship, strength: number ) {
		var targetP = _target.getTargetPoint( this.dataPos );
		_target.dataShipEntity.modifyByLine( this.dataPos.x, this.dataPos.y, 
			targetP.x, targetP.y, strength,
			FkDstrGridData.getStateHide() );
        _target.dataShipEntity.drawDstrObject();
	}
}