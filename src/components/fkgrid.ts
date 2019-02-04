/*
//////////////////////////////
+++ Example usage
//////////////////////////////
var g = new FkGrid(
    game, 'ship',
    cropXy, cropWH, displayXy, false );
*/

export class FkGrid {
	public Draw : ( _alpha : number ) => void;
	public Update : () => void;

	constructor( 
		bitmapData : Phaser.BitmapData, 
		imageName : string, 
		sourceXyPoint : Phaser.Point, 
		sourceWhPoint : Phaser.Point, 
		targetXyPoint : Phaser.Point ) {

		var FRAME_COLOR : string = "rgba(0,255,0,{a})";
		var FRAME_WIDTH : number = 0.5;	

		this.Draw = function( _alpha : number ) : void {
			bitmapData.clear( sourceXyPoint.x, sourceXyPoint.y,
				sourceWhPoint.x, sourceWhPoint.y );
			bitmapData.copyRect( imageName, new Phaser.Rectangle(
				targetXyPoint.x, targetXyPoint.y,
				sourceWhPoint.x, sourceWhPoint.y ), 
				sourceXyPoint.x, sourceXyPoint.y, 
				_alpha );
		}
	}
}