import {FkGrid} from "./fkgrid";
import {FkUtil} from "./fkutil";

export class FkGridCanvas{
    private ALIVE_ALPHA : number = 1;
    private NORMAL_ALPHA : number = 0.3;
    private NON_EDIT_ALIVE_ALPHA : number = 1;
    private NON_EDIT_NORMAL_ALPHA : number = 0;
    private HOVER_ALIVE_ALPHA : number = 1;
    private HOVER_NORMAL_ALPHA : number = 0.8;
    private FRAME_ALPHA : number = 1;   

    public dataIsEdit : boolean = false;

    private resBrush1Name : string;
    private layerGridEdge : Phaser.Graphics;
    private layerCanvas : Phaser.BitmapData;
    private dataGrid : FkGrid[];
    private dataIsAlive : boolean[];

	constructor( _game : Phaser.Game, 
        _targetXy : Phaser.Point, 
        _targetWhCount : Phaser.Point, 
        _sourceWh : Phaser.Point, 
        _sourceXy : Phaser.Point, 
        _isEdit : boolean ) {

        this.dataIsEdit = _isEdit;
 
        this.resBrush1Name = 'ship';

        this.layerGridEdge = _game.add.graphics( _targetXy.x, _targetXy.y );
        this.layerGridEdge.alpha = this.FRAME_ALPHA;

        this.layerCanvas = _game.make.bitmapData( 
            _targetWhCount.x * _sourceWh.x, 
            _targetWhCount.y * _sourceWh.y );
        this.layerCanvas.addToWorld( _targetXy.x, _targetXy.y );

        // grid
        this.dataGrid = []; 
        this.dataIsAlive = [];
        for ( var i = 0; i < _targetWhCount.x; i++ ) {
            for ( var j = 0; j < _targetWhCount.y; j++ ) {
            	var idx = i * _targetWhCount.y + j;
                var isA = Math.random() > 0.5;
                var sXy = new Phaser.Point( 
                    _sourceXy.x + i * _sourceWh.x, 
                    _sourceXy.y + j * _sourceWh.y );
                var dXy = new Phaser.Point( i * _sourceWh.x, j * _sourceWh.y );
                var g = new FkGrid( this.layerCanvas, this.resBrush1Name, sXy, _sourceWh, dXy );
                this.dataGrid.push( g );
                this.dataIsAlive.push( isA );
            }
        }

        this.UpdateCanvas();
	}

    public GetIsEdit() : boolean { 
        return this.dataIsEdit; 
    }

    public SetIsEdit( b ) {
        if ( this.dataIsEdit == b )
            return;
        this.dataIsEdit = b;
        this.UpdateCanvas();
    }

    private UpdateCanvas() {
        for ( var idx = 0; idx < this.dataGrid.length; idx++ ) {
            this.UpdateGridLook( idx );
        }
        this.UpdateGridEdges();
    }

    private ToggleAlive( idx ) {
        this.dataIsAlive[ idx ] = !this.dataIsAlive[idx];
    }

    private UpdateGridLook( idx, isHovering = false ) {
        var g = this.dataGrid[ idx ];
        var isA = this.dataIsAlive[ idx ];
        var a = this.dataIsEdit ?
            ( isA ? this.ALIVE_ALPHA : this.NORMAL_ALPHA ) :
            ( isA ? this.NON_EDIT_ALIVE_ALPHA : this.NON_EDIT_NORMAL_ALPHA );
        if ( this.dataIsEdit && isHovering )
            a = isA ? this.HOVER_ALIVE_ALPHA : this.HOVER_NORMAL_ALPHA;
        g.Draw( a );
    }

    private UpdateGridEdges() {
        // Grid update will update all the other grid edges ( to optimize )
        this.layerGridEdge.clear();
        for ( var idx = 0; idx < this.dataGrid.length; idx++ ) {
            var g = this.dataGrid[ idx ];
            var isA = this.dataIsAlive[ idx ];
            var isD = this.dataIsEdit && isA;
            g.UpdateGridFrame( this.layerGridEdge, isD );
        }
    }
}