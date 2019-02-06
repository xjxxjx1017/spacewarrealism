import * as Phaser from 'phaser-ce';

export class FkUtil {
	public static strokeRect( 
		graphics : Phaser.Graphics,
		x1 : number, y1 : number,
		x2 : number, y2 : number ) : void 
	{
		graphics.moveTo( x1, y1 );
		graphics.lineTo( x2, y1 );
		graphics.lineTo( x2, y2 );
		graphics.lineTo( x1, y2 );
		graphics.lineTo( x1, y1 );
	}
}