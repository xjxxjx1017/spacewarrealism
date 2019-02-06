import * as Phaser from 'phaser-ce';

export class FkImageButton {

	private resNormal : string;
	private resHover : string;
	private resDown : string;
	private layerSpr : Phaser.Sprite;

	constructor( _game : Phaser.Game, 
		_x, _y, _normal, _hover, _down, _icon, _callback) {

		this.resNormal = _normal;
		this.resHover = _hover;
		this.resDown = _down;

		this.layerSpr = new Phaser.Sprite( _game, _x, _y, _normal );
		_game.add.existing( this.layerSpr );

		this.layerSpr.inputEnabled = true;

		this.layerSpr.events.onInputOver.add( this.enterButtonHoverState, this );
		this.layerSpr.events.onInputOut.add( this.enterButtonRestState, this );
		this.layerSpr.events.onInputDown.add( this.enterButtonActiveState, this );
		this.layerSpr.events.onInputUp.add( () => {
			this.enterButtonHoverState();
			_callback();
		}, this);


		if( _icon != null ) {
            _game.add.image(_x, _y, _icon);
		}
	}

	private enterButtonHoverState() {
    	this.layerSpr.loadTexture( this.resHover );
	}

	private enterButtonRestState() {
    	this.layerSpr.loadTexture( this.resNormal );
	}

	private enterButtonActiveState() {
    	this.layerSpr.loadTexture( this.resDown );
	}

}
