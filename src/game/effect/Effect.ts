import {GameData, FkUtil} from "../importall";

export class Effect{
	private static effectManagerGun : Phaser.GameObjects.Group = null;

	public static createShootEffect( _p1 : Phaser.Geom.Point, _p2 : Phaser.Geom.Point ) {
		if (FkUtil.debug)
			FkUtil.debugDrawLine( _p1, _p2 );
		if ( Effect.effectManagerGun == null ) {
			Effect.effectManagerGun = GameData.inst.add.group(<GroupConfig>{ 
				defaultKey: "red_laser", 
				maxSize: 10
			});
		}

		var group = Effect.effectManagerGun;
		var eff : Phaser.GameObjects.Sprite = group.get();
		if (!eff) 
			return;
		var angle = FkUtil.getAngle( _p1.x, _p1.y, _p2.x, _p2.y );
		var dx = Math.cos(angle) * eff.height / 2;
		var dy = Math.sin(angle) * eff.height / 2;
		eff.setActive(true).setVisible(true).setAlpha(1).setRotation( angle + Math.PI/2 ).setX( _p1.x + dx ).setY( _p1.y + dy );
		GameData.inst.tweens.add({
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
}