
export class ImageButton {
	constructor(game, x, y, normal, hover, down, icon, callback) {
		var self = this;
		var Sprite = Phaser.GameObjects.Sprite;

		var spr = new Sprite(game, x, y, normal);

		spr.setInteractive({ useHandCursor: true })
			.on('pointerover', () => enterButtonHoverState() )
			.on('pointerout', () => enterButtonRestState() )
			.on('pointerdown', () => enterButtonActiveState() )
			.on('pointerup', () => {
				enterButtonHoverState();
				callback();
			});

		game.add.existing( spr );
		if( icon != null ) {
            game.add.image(x, y, icon);
		}

		function enterButtonHoverState() {
	    	spr.setTexture( hover );
		}

		function enterButtonRestState() {
	    	spr.setTexture( normal );
		}

		function enterButtonActiveState() {
	    	spr.setTexture( down );
		}
	}

}
