import { ResourceLoader } from './../resourceloader.js';
import { CropBob } from './../component/cropbob.js'
import { TextButton } from './../component/textbutton.js'
import { GridCanvas } from './../component/gridcanvas.js'

export class Game1{
	constructor() {
        var Point = Phaser.Geom.Point;
        var game;
        var gridcanvas;

        this.config = function() {
            return {};
        }

        this.preload = function() {
            game = this;
            ResourceLoader.load( game );
        }

        this.create = function() {
            // bg
            game.add.image(0, 0, 'space').setAlpha(1);

            // grid canvas
            gridcanvas = new GridCanvas( game, 
                new Point( 30, 30 ),    // target xy
                new Point( 30, 15 ),    // target wh count
                new Point( 10, 10 ),    // cell wh
                new Point( 0, 0 ) );    // source xy
        }

        this.update = function() {
            gridcanvas.update();
        }
    }
}

