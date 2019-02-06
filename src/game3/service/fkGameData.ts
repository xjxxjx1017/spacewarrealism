import * as Phaser from 'phaser-ce';
import {FkGridCanvas} from "../../components/fkgridcanvas";
import {FkGrid} from "../../components/fkgrid";
import {FkImageButton} from "../../components/fkimagebutton";

export class FkGameData {
	private dataGame : Phaser.Game;
    private layerGridCanvas : FkGridCanvas;

	private static _inst:FkGameData = null;
	public static inst():FkGameData {
		if ( this._inst == null )
			this._inst = new FkGameData();
		return this._inst;
	}

	private constructor() {}

	public Init( _game : Phaser.Game ) : Phaser.Game {
		return this.dataGame = _game;
	}

	public Run() {
        this.layerGridCanvas = new FkGridCanvas( this.dataGame, 
            new Phaser.Point( 30, 30 ),    // target xy
            new Phaser.Point( 40, 20 ),    // target wh count
            new Phaser.Point( 20, 20 ),    // cell wh
            new Phaser.Point( 0, 0 ), true );    // source xy

        // button
        var cC = 0;
        var cB1 = new FkImageButton( this.dataGame, 550, 50, 
            'button_normal', 
            'button_hover', 
            'button_down', 
            'overlay_ship', () => {
            this.layerGridCanvas.SetIsEdit( !this.layerGridCanvas.GetIsEdit() );
        });
        var cB2 = new FkImageButton( this.dataGame, 550, 50 + 64 + 5, 
            'button_normal', 
            'button_hover', 
            'button_down', 
            'overlay_missle', () => {
            console.log( ++cC );
        });
	}

    public Update() {
        this.layerGridCanvas.Update();
    }
}