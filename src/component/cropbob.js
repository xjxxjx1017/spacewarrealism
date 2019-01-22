
/*
//////////////////////////////
+++ Example usage
//////////////////////////////
var g = new CropBob(
    game, 'ship',
    cropXy, cropWH, displayXy, false );
*/


export class CropBob {
	constructor( game, imageName, cropXyPoint, cropWhPoint, targetXyPoint, isDebug ) {
		var bob;
		var debug;

		// Initialization
        var bob = game.add.image( 
        	targetXyPoint.x - cropXyPoint.x, 
        	targetXyPoint.y - cropXyPoint.y, imageName )
    		.setOrigin(0, 0)
    		.setCrop(
	            cropXyPoint.x,
	            cropXyPoint.y,
	            cropWhPoint.x,
	            cropWhPoint.y
	        );
	    this.bob = bob;

        // Debug graphics
        if ( isDebug )
        	debug = game.add.graphics();
		
        this.setXy = function( xyPoint ) {
			bob.x = xyPoint.x;
			bob.y = xyPoint.y;
		}

		this.update = function() {
	        if ( isDebug ) {
		        debug.clear();
		        debug.lineStyle(0.5, 0x00ff00);
		        debug.strokeRect(
		            bob.x + cropXyPoint.x,
		            bob.y + cropXyPoint.y, 
		            bob._crop.width, 
		            bob._crop.height );
	        }
		}
	}
}