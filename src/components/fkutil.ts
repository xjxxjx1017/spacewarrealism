import "../importall";

export class FkUtil {
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
}