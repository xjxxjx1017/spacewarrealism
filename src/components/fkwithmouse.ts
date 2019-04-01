import "phaser";

export class FkWithMouse{
	private dataCurSrcName : string;
	private dataSprite : Phaser.GameObjects.Sprite;
	private dataGame : Phaser.Scene;
	private dataIsActive : boolean = false;

	constructor( _game : Phaser.Scene ) {
		var self = this;
		// create a hidden sprite to track mouse
		this.dataGame = _game;
		this.dataGame.input.on( "pointermove", function( _p : Phaser.Geom.Point ) {
			if ( self.dataIsActive && self.dataSprite != null ) {
				self.dataSprite.setX( _p.x );
				self.dataSprite.setY( _p.y );
			}
		} );
	}

	public LoadImage( _srcName : string ) {
		this.dataIsActive = true;
		if ( this.dataSprite == null )
			this.dataSprite = this.dataGame.add.sprite( 100, 100, _srcName );
		else {
			this.dataSprite.setVisible( true );
			this.dataSprite.setTexture( _srcName );
		}
	}

	public UnloadImage() {
		this.dataIsActive = false;
		this.dataSprite.setVisible( false );
	}
}