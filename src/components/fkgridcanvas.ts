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

    public dataGame : Phaser.Game;
    public dataIsEdit : boolean = false;
    public dataSourceXy : Phaser.Point;
    public dataSourceWh : Phaser.Point;
    public dataTargetXy : Phaser.Point;

    private resBrush1Name : string;
    private layerGridEdge : Phaser.Graphics;
    private layerCanvas : Phaser.Image;
    private layerCursor : Phaser.Graphics;
    private dataGrid : FkGrid[];
    private dataIsAlive : boolean[];

	constructor( _game : Phaser.Game, 
        _targetXy : Phaser.Point, 
        _targetWhCount : Phaser.Point, 
        _sourceWh : Phaser.Point, 
        _sourceXy : Phaser.Point, 
        _isEdit : boolean ) {

        this.dataGame = _game;
        this.dataIsEdit = _isEdit;
        this.dataSourceXy = _sourceXy;
        this.dataSourceWh = _sourceWh;
        this.dataTargetXy = _targetXy;
 
        this.resBrush1Name = 'ship';

        this.layerGridEdge = _game.add.graphics( _targetXy.x, _targetXy.y );
        this.layerGridEdge.alpha = this.FRAME_ALPHA;

        var cv = _game.make.bitmapData( 
            _targetWhCount.x * _sourceWh.x, 
            _targetWhCount.y * _sourceWh.y );
        this.layerCanvas = cv.addToWorld( _targetXy.x, _targetXy.y );
        this.layerCanvas.inputEnabled = true;

        this.layerCursor = _game.add.graphics( _targetXy.x, _targetXy.y );
        this.layerCursor.alpha = this.FRAME_ALPHA;

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
                var g = new FkGrid( cv, this.resBrush1Name, sXy, _sourceWh, dXy );
                this.dataGrid.push( g );
                this.dataIsAlive.push( isA );
            }
        }

        this.DrawCanvas();
	}

    public Update() {
        var isO = this.layerCanvas.input.checkPointerOver( this.dataGame.input.mousePointer );
        if ( isO )
            this.UpdateCursor();
    }

    public GetIsEdit() : boolean { 
        return this.dataIsEdit; 
    }

    public SetIsEdit( b ) {
        if ( this.dataIsEdit == b )
            return;
        this.dataIsEdit = b;
        this.DrawCanvas();
    }

    private UpdateCursor() {
        this.layerCursor.clear();
        this.layerCursor.lineStyle( 1, 0x00ff00, 1);
        FkUtil.strokeRect( this.layerCursor, 
            FkUtil.snapToPos( this.dataGame.input.mousePointer.x - this.dataTargetXy.x, this.dataSourceWh.x ),
            FkUtil.snapToPos( this.dataGame.input.mousePointer.y - this.dataTargetXy.y, this.dataSourceWh.y ),
            this.dataSourceWh.x, this.dataSourceWh.y );
    }

    private DrawCanvas() {
        for ( var idx = 0; idx < this.dataGrid.length; idx++ ) {
            this.DrawGrid( idx );
        }
        this.DrawGridEdges();
    }

    private ToggleAlive( idx ) {
        this.dataIsAlive[ idx ] = !this.dataIsAlive[idx];
    }

    private DrawGrid( idx, isHovering = false ) {
        var g = this.dataGrid[ idx ];
        var isA = this.dataIsAlive[ idx ];
        var a = this.dataIsEdit ?
            ( isA ? this.ALIVE_ALPHA : this.NORMAL_ALPHA ) :
            ( isA ? this.NON_EDIT_ALIVE_ALPHA : this.NON_EDIT_NORMAL_ALPHA );
        if ( this.dataIsEdit && isHovering )
            a = isA ? this.HOVER_ALIVE_ALPHA : this.HOVER_NORMAL_ALPHA;
        g.Draw( a );
    }

    private DrawGridEdges() {
        // Grid update will update all the other grid edges ( to optimize )
        this.layerGridEdge.clear();
        for ( var idx = 0; idx < this.dataGrid.length; idx++ ) {
            var g = this.dataGrid[ idx ];
            var isA = this.dataIsAlive[ idx ];
            var isD = this.dataIsEdit && isA;
            g.DrawGridFrame( this.layerGridEdge, isD );
        }
    }
}