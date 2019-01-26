
/*
//////////////////////////////
+++ Example usage
//////////////////////////////
var g = new CropBob(
    game, 'ship',
    cropXy, cropWH, displayXy, false );
*/

export class CropBob {
	constructor( game, imageName, cropXyPoint, cropWhPoint, targetXyPoint,
		hovercallback, resetcallback, clickcallback ) {
		var Rectangle = Phaser.Geom.Rectangle;
		var bob;
		var debug;
		var isDebug;

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

	    var shape = new Rectangle( 
	    	cropXyPoint.x,
            cropXyPoint.y, 
            bob._crop.width, 
            bob._crop.height );
	    var count = 0;
		bob.setInteractive(shape, Rectangle.Contains)
			.on('pointerover', () => enterButtonHoverState() )
			.on('pointerout', () => enterButtonRestState() )
			.on('pointerup', () => {
				if ( clickcallback != null )
					clickcallback();
			});
		function enterButtonHoverState() { 
			if ( hovercallback != null )
				hovercallback();
		}
		function enterButtonRestState(){ 
			if ( resetcallback != null )
				resetcallback();
		}

        // Debug graphics
        debug = game.add.graphics();
		
        this.setXy = function( xyPoint ) {
			bob.x = xyPoint.x;
			bob.y = xyPoint.y;
		}

		this.setLook = function( style ) {
			if ( style.alpha != null )
				bob.setAlpha( style.alpha );
			if ( style.isDebug != null )
				isDebug = style.isDebug;
			if ( style.isEdit != null ) {
        		if ( style.isEdit )
        			bob.setInteractive();
        		else
        			bob.disableInteractive();
			}
		}

		this.update = function() {
			debug.clear();
	        if ( isDebug ) {
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