import * as Phaser from 'phaser-ce';

export class FkImageButton {
	constructor( game : Phaser.Game, 
		x, y, normal, hover, down, icon, callback) {

		var spr = new Phaser.Sprite( game, x, y, normal );
		game.add.existing( spr );

		spr.inputEnabled = true;

		spr.events.onInputOver.add( enterButtonHoverState, this );
		spr.events.onInputOut.add( enterButtonRestState, this );
		spr.events.onInputDown.add( enterButtonActiveState, this );
		spr.events.onInputUp.add( () => {
			enterButtonHoverState();
			callback();
		}, this);


		if( icon != null ) {
            game.add.image(x, y, icon);
		}

		function enterButtonHoverState() {
	    	spr.loadTexture( hover );
		}

		function enterButtonRestState() {
	    	spr.loadTexture( normal );
		}

		function enterButtonActiveState() {
	    	spr.loadTexture( down );
		}
	}

}
