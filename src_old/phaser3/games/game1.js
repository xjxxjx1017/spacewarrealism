import { ResourceLoader } from './../resourceloader.js';
import { CropBob } from './../component/cropbob.js'
import { TextButton } from './../component/textbutton.js'
import { ImageButton } from './../component/imagebutton.js'
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
                new Point( 50, 25 ),    // target wh count
                new Point( 10, 10 ),    // cell wh
                new Point( 0, 0 ), true );    // source xy

            // button
            var clickCount = 0;
            var clickButton = new ImageButton(game, 550, 50, 
                'button_normal', 
                'button_hover', 
                'button_down', 
                'overlay_ship', () => {
                gridcanvas.setIsEdit( !gridcanvas.getIsEdit() );
            });
            var clickButton = new ImageButton(game, 550, 50 + 64 + 5, 
                'button_normal', 
                'button_hover', 
                'button_down', 
                'overlay_missle', () => {
                console.log( ++clickCount );
            });
        }

        this.update = function() {
            gridcanvas.update();
        }
    }
}

