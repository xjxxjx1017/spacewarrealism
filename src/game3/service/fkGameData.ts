import * as Phaser from 'phaser-ce';
import {FkGridCanvas, FkBrush} from "../../components/fkgridcanvas";
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
        var self = this;
        this.layerGridCanvas = new FkGridCanvas( this.dataGame, 
            new Phaser.Point( 30, 30 ),    // target xy
            new Phaser.Point( 100, 50 ),    // target wh count
            new Phaser.Point( 5, 5 ),    // cell wh
            new Phaser.Point( 0, 0 ), true );    // source xy
        this.UseBrushNormal();

        // button
        var cB1 = this.CreateButton( 1, 'overlay_ship', () => {
            self.layerGridCanvas.SetIsEdit( !this.layerGridCanvas.GetIsEdit() );
        });
        var cB2 = this.CreateButton( 2, 'overlay_grass', () => { self.UseBrushNormal() } );
        var cB3 = this.CreateButton( 3, 'overlay_nohuman', () => { self.UseBrushEraser() } );
	}

    public Update() {
        this.layerGridCanvas.Update();
    }

    private CreateButton( _seq: number, _overlay: string, _onClick: () => void ) : FkImageButton {
        return new FkImageButton( this.dataGame, 550, 50 + (64 + 5) * (_seq - 1), 
            'button_normal',  'button_hover',  'button_down', 
            _overlay, _onClick );
    }

    private UseBrushNormal() {
        var self = this;
        this.layerGridCanvas.SetBrush( new FkBrush( "Normal", ( _idx: number ) => {
            self.layerGridCanvas.SetGridIsAlive( _idx, true );
        }))
    }

    private UseBrushEraser() {
        var self = this;
        this.layerGridCanvas.SetBrush( new FkBrush( "Eraser", ( _idx: number ) => {
            self.layerGridCanvas.SetGridIsAlive( _idx, false );
        }))
    }
}