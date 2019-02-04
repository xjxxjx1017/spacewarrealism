import * as Phaser from 'phaser-ce';

export class FkImageButton {
	constructor( game : Phaser.Game, 
		x, y, normal, hover, down, icon, callback) {

		var spr = new Phaser.Sprite( game, x, y, normal );

		spr.inputEnabled = true;

		spr.events.onInputOver.add( enterButtonHoverState );
		spr.events.onInputOut.add( enterButtonRestState );
		spr.events.onInputDown.add( enterButtonActiveState );
		spr.events.onInputUp.add( () => {
			enterButtonHoverState();
			callback();
		});

		game.add.existing( spr );

		if( icon != null ) {
            game.add.image(x, y, icon);
		}

		function enterButtonHoverState() {
	    	spr.setTexture( hover );
	    	console.log( "aaa" );
		}

		function enterButtonRestState() {
	    	spr.setTexture( normal );
	    	console.log( "aaa" );
		}

		function enterButtonActiveState() {
	    	spr.setTexture( down );
	    	console.log( "aaa" );
		}
	}

}
