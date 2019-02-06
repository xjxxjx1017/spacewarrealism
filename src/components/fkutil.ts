import * as Phaser from 'phaser-ce';

export class FkUtil {
	public static strokeRect( 
		graphics : Phaser.Graphics,
		x : number, y : number,
		w : number, h : number )
	{
		graphics.moveTo( x, y );
		graphics.lineTo( x + w, y );
		graphics.lineTo( x + w, y + h );
		graphics.lineTo( x, y + h );
		graphics.lineTo( x, y );
	}
}