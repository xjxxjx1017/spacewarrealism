import {CropBob} from "./cropbob.js";

export class GridCanvas{
	constructor( game, targetXy, targetWhCount, cellWh, sourceXy ) {
		var self = this;
		var Point = Phaser.Geom.Point;
		var pos = new Point();
        var gridList = []; 
		var cellAlphaMap = [];

        // grid
        for ( var i = 0; i < targetWhCount.x; i++ ) {
            for ( var j = 0; j < targetWhCount.y; j++ ) {
                var isAlive = i > 3 && i < 15;
                var cellXy = new Point( 
                	sourceXy.x + i * cellWh.x, 
                	sourceXy.y + j * cellWh.y );
                var displayXy = new Point( 
                	targetXy.x + i * cellWh.x, 
                	targetXy.y + j * cellWh.y );
                var g = new CropBob(
                    game, 'ship',
                    cellXy, cellWh, displayXy, !isAlive );
                gridList.push( g );
                cellAlphaMap.push( isAlive ? 1 : 0.3 );
                g.bob.setAlpha( isAlive ? 1 : 0.3 );
            }
        }

        this.update = function() {
            gridList.forEach( function(g){
                g.update();
            } )
        }
	}
}