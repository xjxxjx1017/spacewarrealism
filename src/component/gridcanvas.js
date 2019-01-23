import {CropBob} from "./cropbob.js";

class InteractiveGrid extends CropBob {
	constructor( game, imageName, cropXyPoint, cropWhPoint, targetXyPoint,
		updateGridLook, clickCallback, idx ) {
		super( game, imageName, cropXyPoint, cropWhPoint, targetXyPoint,
			hover, reset, click );

        this.reset = reset;

        function hover() {
        	if ( game.input.activePointer.isDown )
        		clickCallback( idx );
        	updateGridLook( idx, true );
        }
        function reset() {
        	updateGridLook( idx, false );
        }
        function click() {
        	clickCallback( idx );
        	updateGridLook( idx, true );
        }
	}
}

export class GridCanvas{
	constructor( game, targetXy, targetWhCount, cellWh, sourceXy, isEdit ) {
		var self = this;
		var Point = Phaser.Geom.Point;
        var gridMap = []; 
		var isAliveMap = [];
		var ALIVE_ALPHA = 1;
		var NORMAL_ALPHA = 0.3;
		var NON_EDIT_ALIVE_ALPHA = 1;
		var NON_EDIT_NORMAL_ALPHA = 0;

        // grid
        for ( var i = 0; i < targetWhCount.x; i++ ) {
            for ( var j = 0; j < targetWhCount.y; j++ ) {
            	var idx = i * targetWhCount.y + j;
                var isAlive = i > 3 && i < 15;
                var cellXy = new Point( 
                	sourceXy.x + i * cellWh.x, 
                	sourceXy.y + j * cellWh.y );
                var displayXy = new Point( 
                	targetXy.x + i * cellWh.x, 
                	targetXy.y + j * cellWh.y );
                var g = new InteractiveGrid(
                    game, 'ship', cellXy, cellWh, displayXy, 
                    updateGridLook, toggleAlive, idx );
                gridMap.push( g );
                isAliveMap.push( isAlive );
                g.reset();
            }
        }

        updateCanvas();

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
        	updateCanvas();
        }

        function updateCanvas() {
	        for ( var i = 0; i < targetWhCount.x; i++ ) {
	            for ( var j = 0; j < targetWhCount.y; j++ ) {
            		var idx = i * targetWhCount.y + j;
	                updateGridLook( idx );
	            }
	        }
        }

        function toggleAlive( idx ) {
        	isAliveMap[ idx ] = !isAliveMap[idx];
        }

        function updateGridLook( idx, isHovering = false ) {
        	var g = gridMap[ idx ];
        	var isAlive = isAliveMap[ idx ];
        	var a = isEdit ?
        		( isAlive ? ALIVE_ALPHA : NORMAL_ALPHA ) :
        		( isAlive ? NON_EDIT_ALIVE_ALPHA : NON_EDIT_NORMAL_ALPHA );
        	var d = isEdit && !isAlive;
        	if ( isEdit && isHovering ) {
        		a = 1;
        		d = true;
        	}
            g.setLook( { alpha: a, isDebug: d, isEdit: isEdit });
        }
	}
}