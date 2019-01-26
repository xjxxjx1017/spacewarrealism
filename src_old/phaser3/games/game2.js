import { ResourceLoader } from './../resourceloader.js';
import { TextButton } from './../component/textbutton.js'
import { ImageButton } from './../component/imagebutton.js'

export class Game2{
	constructor() {
        var Point = Phaser.Geom.Point;
        var game;

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
        }
    }
}

