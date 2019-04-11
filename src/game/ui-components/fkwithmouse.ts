import "phaser";
import {EventWithMouse} from "../events/eventwithmouse";

export class FkWithMouse{
	private dataCurSrcName : string;
	private dataSprite : Phaser.GameObjects.Sprite = null;
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
		
        EventWithMouse.Manager.attach( this, ( _evt : EventWithMouse ) => { 
            _evt.isActive ? 
            self.LoadImage( _evt.src ) : self.UnloadImage(); 
        } );
	}

	public LoadImage( _srcName : string ) {
		this.dataIsActive = true;
		if ( this.dataSprite == null ) {
			var cfg : SpriteConfig = { 
				key: _srcName,
				x: 100, y: 100,
				scale: {
					x: 0.2, y: 0.2
				}
			}
			this.dataSprite = this.dataGame.make.sprite( cfg, true );
			this.dataSprite.setAlpha( 0.7 );
		}
		else {
			this.dataSprite.setVisible( true );
			this.dataSprite.setTexture( _srcName );
		}
	}

	public UnloadImage() {
		this.dataIsActive = false;
		if ( this.dataSprite != null )
			this.dataSprite.setVisible( false );
	}
}