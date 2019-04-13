import "phaser";
import {Ship} from "./ship";
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";

export class Gun {
	private static effectManagerGun : Phaser.GameObjects.Group = null;
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

	public createShootEffect( _p1 : Phaser.Geom.Point, _p2 : Phaser.Geom.Point ) {
		var self = this;
		if ( Gun.effectManagerGun == null ) {
			Gun.effectManagerGun = this.dataGame.add.group(<GroupConfig>{ 
				defaultKey: "red_laser", 
				maxSize: 10
			});
		}

		var group = Gun.effectManagerGun;
		var eff : Phaser.GameObjects.Sprite = group.get();
		if (!eff) 
			return;
		var angle = Math.atan( (_p2.y - _p1.y) / (_p2.x - _p1.x) );
		if ( _p2.x - _p1.x < 0 )
			angle += Math.PI;
		var dx = Math.cos(angle) * eff.height / 2;
		var dy = Math.sin(angle) * eff.height / 2;
		eff.setActive(true).setVisible(true).setAlpha(1).setRotation( angle + Math.PI/2 ).setX( _p1.x + dx ).setY( _p1.y + dy );
		self.dataGame.tweens.add({
            targets: eff,
			alpha : 0,
			duration : 1000,
			ease : "Power3",
			onComplete: function(t) {
				if ( t && t.targets && t.targets[0] )
					group.killAndHide( t.targets[0] );
			},
			onCompleteScope: this
		});
	}

	public attack( _target : Ship, strength: number ) {
		var targetP = _target.getTargetPoint( this.dataPos );
		_target.dataShipEntity.modifyByLine( this.dataPos.x, this.dataPos.y, 
			targetP.x, targetP.y, strength,
			FkDstrGridData.getStateHide() );
        _target.dataShipEntity.drawDstrObject();

        this.createShootEffect( this.dataPos, targetP );
	}
}