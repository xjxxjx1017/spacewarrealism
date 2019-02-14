import {FkUtil} from "./fkutil";
import * as _ from "lodash";


/*
//////////////////////////////
+++ Example usage
//////////////////////////////
var g = new FkGrid( c, 'ship',
        	new Phaser.Point( 20, 20 ), new Phaser.Point( 40, 40 ),
        	new Phaser.Point( 100, 100 ) );
g.Draw( 1 );
*/

export class FkGrid {
	private FRAME_COLOR : number = 0x00ff00;
	private FRAME_WIDTH : number = 2;	

	private resImageName : string;
	private layerBitmapData : Phaser.GameObjects.RenderTexture;
	private dataSourceXy : Phaser.Geom.Point;
	private dataSourceWh : Phaser.Geom.Point;
	private dataTargetXy : Phaser.Geom.Point;

	constructor( 
		_bitmapData : Phaser.GameObjects.RenderTexture, 
		_imageName : string, 
		_sourceXy : Phaser.Geom.Point, 
		_sourceWh : Phaser.Geom.Point, 
		_targetXy : Phaser.Geom.Point ) {
		this.layerBitmapData = _bitmapData;
		this.resImageName = _imageName;
		this.dataSourceXy = _sourceXy;
		this.dataSourceWh = _sourceWh;
		this.dataTargetXy = _targetXy;
	}

	public Draw( _alpha : number ) {
		this.layerBitmapData.clear( 
			this.dataSourceXy.x, this.dataSourceXy.y,
			this.dataSourceWh.x, this.dataSourceWh.y );
		this.layerBitmapData.copyRect( this.resImageName, new Phaser.Geom.Rectangle(
			this.dataTargetXy.x, this.dataTargetXy.y,
			this.dataSourceWh.x, this.dataSourceWh.y ), 
			this.dataSourceXy.x, this.dataSourceXy.y, 
			_alpha );
	}

	public DrawGridFrame( _gridEdgeGraphic : Phaser.GameObjects.Graphics, 
		_showFrame : boolean ) {
        if ( _showFrame ) {
            _gridEdgeGraphic.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR, 1);
            FkUtil.strokeRect( _gridEdgeGraphic,
                this.dataSourceXy.x, this.dataSourceXy.y, 
                this.dataSourceWh.x, this.dataSourceWh.y );
        }
	}
}