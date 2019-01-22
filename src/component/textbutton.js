
/*
//////////////////////////////
++ Example usage
//////////////////////////////
var clickCount = 0;
var clickButton = new TextButton(game, 100, 100, 
    'Click me!', { fill: '#0f0'}, () => {
    console.log( ++clickCount );
});
game.add.existing( clickButton );
*/

export class TextButton extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text, style, callback) {
		super(scene, x, y, text, style);

		this.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.enterButtonHoverState() )
			.on('pointerout', () => this.enterButtonRestState() )
			.on('pointerdown', () => this.enterButtonActiveState() )
			.on('pointerup', () => {
				this.enterButtonHoverState();
				callback();
			});
	}

	enterButtonHoverState() {
		this.setStyle({ fill: '#ff0'});
	}

	enterButtonRestState() {
		this.setStyle({ fill: '#0f0'});
	}

	enterButtonActiveState() {
		this.setStyle({ fill: '#0ff' });
	}
}
