import * as Phaser from 'phaser-ce';
import {FkGridCanvas} from "../../components/fkgridcanvas";
import {FkGrid} from "../../components/fkgrid";
import {FkImageButton} from "../../components/fkimagebutton";

export class FkGameData {
	private game : Phaser.Game;

	private static _inst:FkGameData = null;
	public static inst():FkGameData {
		if ( this._inst == null )
			this._inst = new FkGameData();
		return this._inst;
	}

	private constructor() {}

	public Init( game : Phaser.Game ) : Phaser.Game {
		return this.game = game;
	}

	public Run() {

        // var gridcanvas = new FkGridCanvas( this.game, 
        //     new Phaser.Point( 30, 30 ),    // target xy
        //     new Phaser.Point( 40, 20 ),    // target wh count
        //     new Phaser.Point( 20, 20 ),    // cell wh
        //     new Phaser.Point( 0, 0 ), true );    // source xy

        // var canvas = this.game.make.bitmapData(200, 200);
        // canvas.rect(0, 0, canvas.width, canvas.height, '#3f5c67');
        // var canvasSprite = canvas.addToWorld(200, 200);

        // var grid = new FkGrid( canvas, 'ship',
        // 	new Phaser.Point( 20, 20 ), new Phaser.Point( 40, 40 ),
        // 	new Phaser.Point( 100, 100 ) );

        // grid.Draw( 1 );

        // button
        var clickCount = 0;
        // var clickButton = new FkImageButton( this.game, 550, 50, 
        //     'button_normal', 
        //     'button_hover', 
        //     'button_down', 
        //     'overlay_ship', () => {
        //     gridcanvas.SetIsEdit( !gridcanvas.GetIsEdit() );
        // });
        // var clickButton = new FkImageButton( this.game, 550, 50 + 64 + 5, 
        //     'button_normal', 
        //     'button_hover', 
        //     'button_down', 
        //     'overlay_missle', () => {
        //     console.log( ++clickCount );
        // });

        var image = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        image.anchor.set(0.5);
        image.inputEnabled = true;
        var text = this.game.add.text(250, 16, '', { fill: '#ffffff' });
        image.events.onInputDown.add(listener, this);

        function listener () {

            clickCount++;
            text.text = "You clicked " + clickCount + " times!";

        }
	}
}