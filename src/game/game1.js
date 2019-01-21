import 'phaser';
import { ResourceLoader } from './../resourceloader.js';
import { CropBob } from './../component/cropbob.js'

class Game1{
	constructor() {
        var Point = Phaser.Geom.Point;
        var game;
        var gridList = []; 
        var gridCountXy = new Point( 30, 15 );

        this.config = function() {
            return {};
        }

        this.preload = function() {
            game = this;
            ResourceLoader.load( game );
        }

        this.create = function() {
            // bg
            game.add.image(300, 300, 'logo').setAlpha(0.3);

            // grid
            for ( var i = 0; i < gridCountXy.x; i++ ) {
                for ( var j = 0; j < gridCountXy.y; j++ ) {
                    var cropWH = new Point( 10, 10 );
                    var cropXy = new Point( 0 + i * cropWH.x, 0 + j * cropWH.y );
                    var displayXy = new Point( 30 + i * cropWH.x, 30 + j * cropWH.y );
                    var g = new CropBob(
                        game, 'logo',
                        cropXy, cropWH, displayXy, true );
                    gridList.push( g );
                }
            }
        }

        this.update = function() {
            gridList.forEach( function(g){
                g.update();
            } )
        }
    }
}

export {Game1};

