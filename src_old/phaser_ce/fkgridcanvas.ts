import {FkGrid} from "./fkgrid";
import {FkUtil} from "./fkutil";

export class FkBrush{
    public dataBrushName : string;
    public dataBrushDraw : ( _idx : number ) => void;

    constructor( _brushName: string, _brushDraw: ( _idx : number ) => void )
    {
        this.dataBrushName = _brushName;
        this.dataBrushDraw = _brushDraw;
    }
}

export class FkGridCanvas{
    private ALIVE_ALPHA : number = 1;
    private NORMAL_ALPHA : number = 0.5;
    private NON_EDIT_ALIVE_ALPHA : number = 1;
    private NON_EDIT_NORMAL_ALPHA : number = 0;
    private FRAME_ALPHA : number = 1;   

    public dataGame : Phaser.Game;
    public dataIsEdit : boolean = false;
    public dataSourceXy : Phaser.Geom.Point;
    public dataSourceWh : Phaser.Geom.Point;
    public dataTargetXy : Phaser.Geom.Point;
    public dataTargetWhCount : Phaser.Geom.Point;

    private resBrush1Name : string;
    private layerGridEdge : Phaser.GameObjects.Graphics;
    private layerCanvas : Phaser.GameObjects.Image;
    private layerCursor : Phaser.GameObjects.Graphics;
    private dataGrid : FkGrid[];
    private dataIsAlive : boolean[];
    private dataBrush : FkBrush;

	constructor( _game : Phaser.Game, 
        _targetXy : Phaser.Geom.Point, 
        _targetWhCount : Phaser.Geom.Point, 
        _sourceWh : Phaser.Geom.Point, 
        _sourceXy : Phaser.Geom.Point, 
        _isEdit : boolean ) {

        this.dataGame = _game;
        this.dataIsEdit = _isEdit;
        this.dataSourceXy = _sourceXy;
        this.dataSourceWh = _sourceWh;
        this.dataTargetXy = _targetXy;
        this.dataTargetWhCount = _targetWhCount;
 
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
                var sXy = new Phaser.Geom.Point( 
                    _sourceXy.x + i * _sourceWh.x, 
                    _sourceXy.y + j * _sourceWh.y );
                var dXy = new Phaser.Geom.Point( i * _sourceWh.x, j * _sourceWh.y );
                var g = new FkGrid( cv, this.resBrush1Name, sXy, _sourceWh, dXy );
                this.dataGrid.push( g );
                this.dataIsAlive.push( isA );
            }
        }

        this.DrawCanvas();
	}

    public Update() {
        var isO = this.layerCanvas.input.checkPointerOver( this.dataGame.input.mousePointer );
        if ( isO ) {
            this.UpdateCursor();
            if ( this.dataGame.input.mousePointer.isDown )
                this.UpdateBrushPaint();
        }
    }

    public SetBrush( _brush: FkBrush ) {
        this.dataBrush = _brush;
    }

    public SetGridIsAlive( _idx: number, _isAlive: boolean ) {
        this.dataIsAlive[_idx] = _isAlive;
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

    private UpdateBrushPaint() {
        var x = FkUtil.snapToXy( this.dataGame.input.mousePointer.x - this.dataTargetXy.x, this.dataSourceWh.x );
        var y = FkUtil.snapToXy( this.dataGame.input.mousePointer.y - this.dataTargetXy.y, this.dataSourceWh.y );
        var idx = x * this.dataTargetWhCount.y + y;
        if ( idx >= 0 && idx < this.dataIsAlive.length 
            && this.dataIsEdit == true
            && this.dataBrush != null 
            && this.dataBrush.dataBrushDraw != null ) {
            // this.dataIsAlive[idx] = false;
            this.dataBrush.dataBrushDraw( idx );
            this.DrawGrid( idx );
            this.DrawGridEdges();
        }
        else console.log( "Unexpected error E1001" );
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

    private DrawGrid( idx ) {
        var g = this.dataGrid[ idx ];
        var isA = this.dataIsAlive[ idx ];
        var a = this.dataIsEdit ?
            ( isA ? this.ALIVE_ALPHA : this.NORMAL_ALPHA ) :
            ( isA ? this.NON_EDIT_ALIVE_ALPHA : this.NON_EDIT_NORMAL_ALPHA );
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