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
		var captionStyle = {
		    fill: '#7fdbff',
		    fontFamily: 'monospace',
		    lineSpacing: 4
		};

		var captionTextFormat = (
		    'Total:    %1\n' +
		    'Max:      %2\n' +
		    'Active:   %3\n' +
		    'Inactive: %4\n' +
		    'Used:     %5\n' +
		    'Free:     %6\n' +
		    'Full:     %7\n'
		);

		var caption = this.dataGame.add.text(16, 16, '', captionStyle);
		if ( Gun.effectManagerGun == null ) {
			Gun.effectManagerGun = this.dataGame.add.group(<GroupConfig>{ 
				defaultKey: "red_laser", 
				maxSize: 3
			});
		}

		var group = Gun.effectManagerGun;

	    caption.setText(Phaser.Utils.String.Format(captionTextFormat, [
	        group.getLength(),
	        group.maxSize,
	        group.countActive(true),
	        group.countActive(false),
	        group.getTotalUsed(),
	        group.getTotalFree(),
	        group.isFull()
	    ]));
		var alien = group.get();
		if (!alien) 
			return; // None free
		alien.setActive(true).setVisible(true)
		self.dataGame.tweens.add({
            targets: alien,
			alpha : 0,
			duration : 1000,
			ease : "Power3",
    		angle: 180,
			yoyo : true,
			repleat: 10
		})
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