import {GameData} from "../game/importall";

export class FkUtil {
	public static debug: boolean = true;

	public static strokeRect( 
		_graphics : Phaser.GameObjects.Graphics,
		_x : number, _y : number,
		_w : number, _h : number )
	{
		_graphics.moveTo( _x, _y );
		_graphics.lineTo( _x + _w, _y );
		_graphics.lineTo( _x + _w, _y + _h );
		_graphics.lineTo( _x, _y + _h );
		_graphics.lineTo( _x, _y );
	}

	public static snapToPos( a : number, m : number ) : number {
		return Math.floor( a / m ) * m;
	}

	public static snapToXy( a : number, m : number ) : number {
		return Math.floor( a / m );
	}

	public static debugDrawLine( _p1, _p2 ) {
		var g = GameData.inst.add.graphics({x: 0, y: 0});
		g.lineStyle(1, 0xffff00, 1);
	    g.moveTo(_p1.x, _p1.y);
	    g.lineTo(_p2.x, _p2.y);
    	g.strokePath();
    	GameData.inst.tweens.add({
            targets: g,
			alpha : 0,
			duration : 3,
			ease : "Power3",
			onComplete: function(t) {
				g.destroy();
			},
			onCompleteScope: this
		});
	}

	public static debugDrawRect( rect: Phaser.Geom.Rectangle ) {
		var g = GameData.inst.add.graphics({x: 0, y: 0});
		g.lineStyle(1, 0xffff00, 1);
		g.strokeRect( rect.x, rect.y, rect.width, rect.height );
    	GameData.inst.tweens.add({
            targets: g,
			alpha : 0,
			duration : 3,
			ease : "Power3",
			onComplete: function(t) {
				g.destroy();
			},
			onCompleteScope: this
		});
	}
}