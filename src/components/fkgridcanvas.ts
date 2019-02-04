import {FkGrid} from "./fkgrid";

export class FkGridCanvas{
    public GetIsEdit;
    public SetIsEdit;

	constructor( game : Phaser.Game, 
        targetXy : Phaser.Point, 
        targetWhCount : Phaser.Point, 
        sourceWh : Phaser.Point, 
        sourceXy : Phaser.Point, 
        isEdit : boolean ) {

		var ALIVE_ALPHA : number = 1;
		var NORMAL_ALPHA : number = 0.3;
		var NON_EDIT_ALIVE_ALPHA : number = 1;
		var NON_EDIT_NORMAL_ALPHA : number = 0;
		var HOVER_ALIVE_ALPHA : number = 1;
		var HOVER_NORMAL_ALPHA : number = 0.8;
        var DEBUG_FRAME_ALPHA : number = 0.5;

        var brush1Name : string = 'ship';
        var gridMap : FkGrid[] = []; 
        var isAliveMap : boolean[] = [];
        var canvas = game.make.bitmapData( 
            targetWhCount.x * sourceWh.x, 
            targetWhCount.y * sourceWh.y );
        var canvasSprite = canvas.addToWorld( targetXy.x, targetXy.y );

        // grid
        for ( var i = 0; i < targetWhCount.x; i++ ) {
            for ( var j = 0; j < targetWhCount.y; j++ ) {
            	var idx = i * targetWhCount.y + j;
                var isAlive = Math.random() > 0.5;
                var cellSourceXy = new Phaser.Point( 
                	sourceXy.x + i * sourceWh.x, 
                	sourceXy.y + j * sourceWh.y );
                var displayXy = new Phaser.Point( 
                	i * sourceWh.x, 
                	j * sourceWh.y );
                var g = new FkGrid( canvas, brush1Name, cellSourceXy, sourceWh, displayXy );
                gridMap.push( g );
                isAliveMap.push( isAlive );
            }
        }

        UpdateCanvas();

        this.GetIsEdit = function() { return isEdit; }
        this.SetIsEdit = function( b ) {
        	if ( isEdit == b )
        		return;
        	isEdit = b;
        	UpdateCanvas();
        }

        function UpdateCanvas() {
	        for ( var i = 0; i < targetWhCount.x; i++ ) {
	            for ( var j = 0; j < targetWhCount.y; j++ ) {
            		var idx = i * targetWhCount.y + j;
	                UpdateGridLook( idx );
	            }
	        }
        }

        function ToggleAlive( idx ) {
        	isAliveMap[ idx ] = !isAliveMap[idx];
        }

        function UpdateGridLook( idx, isHovering = false ) {
        	var g = gridMap[ idx ];
        	var isAlive = isAliveMap[ idx ];
        	var a = isEdit ?
        		( isAlive ? ALIVE_ALPHA : NORMAL_ALPHA ) :
        		( isAlive ? NON_EDIT_ALIVE_ALPHA : NON_EDIT_NORMAL_ALPHA );
        	var isDebug = isEdit && !isAlive;
        	if ( isEdit && isHovering ) {
        		a = isAlive ? HOVER_ALIVE_ALPHA : HOVER_NORMAL_ALPHA;
        		isDebug = true;
        	}
            g.Draw( a );
        }
	}
}