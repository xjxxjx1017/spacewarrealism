import {CropBob} from "./cropbob.js";

export class GridCanvas{
	constructor( game, targetXy, targetWhCount, cellWh, sourceXy, isEdit ) {
		var self = this;
		var Point = Phaser.Geom.Point;
		var pos = new Point();
        var gridMap = []; 
		var isAliveMap = [];
		var ALIVE_ALPHA = 1;
		var NORMAL_ALPHA = 0.3;
		var NON_EDIT_ALIVE_ALPHA = 1;
		var NON_EDIT_NORMAL_ALPHA = 0;

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
                gridMap.push( g );
                isAliveMap.push( isAlive );
            }
        }

        updateEdit();

        this.update = function() {
            gridMap.forEach( function(g){
                g.update();
            } )
        }

        this.getIsEdit = function() { return isEdit; }
        this.setIsEdit = function( b ) {
        	if ( isEdit == b )
        		return;
        	isEdit = b;
        	updateEdit();
        }

        function updateEdit() {
	        for ( var i = 0; i < targetWhCount.x; i++ ) {
	            for ( var j = 0; j < targetWhCount.y; j++ ) {
	            	var idx = j * targetWhCount.x + i;
	                var g = gridMap[ idx ];
	                var isAlive = isAliveMap[ idx ];
	                g.setDebug( isEdit && !isAlive );
	                var alpha;
	                if ( isEdit ) 
	                	alpha = isAlive ? ALIVE_ALPHA : NORMAL_ALPHA;
	                else
	                	alpha = isAlive ? NON_EDIT_ALIVE_ALPHA : NON_EDIT_NORMAL_ALPHA;
                	g.bob.setAlpha( alpha );
	            }
	        }
        }
	}
}