import {FkUtil} from "./fkutil";
import * as _ from "lodash";


/*
//////////////////////////////
+++ Example usage
//////////////////////////////
var g = new FkGrid(
    game, 'ship',
    cropXy, cropWH, displayXy, false );
*/

export class FkGrid {
	private FRAME_COLOR : number = 0x00ff00;
	private FRAME_WIDTH : number = 2;	

	public isHovering : boolean = false;

	private bitmapData : Phaser.BitmapData;
	private imageName : string;
	private sourceXyPoint : Phaser.Point;
	private sourceWhPoint : Phaser.Point;
	private targetXyPoint : Phaser.Point;

	constructor( 
		bitmapData : Phaser.BitmapData, 
		imageName : string, 
		sourceXyPoint : Phaser.Point, 
		sourceWhPoint : Phaser.Point, 
		targetXyPoint : Phaser.Point ) {
		this.bitmapData = bitmapData;
		this.imageName = imageName;
		this.sourceXyPoint = _.cloneDeep( sourceXyPoint );
		this.sourceWhPoint = _.cloneDeep( sourceWhPoint );
		this.targetXyPoint = _.cloneDeep( targetXyPoint );
	}

	public Draw( alpha : number ) {
		this.bitmapData.clear( 
			this.sourceXyPoint.x, this.sourceXyPoint.y,
			this.sourceWhPoint.x, this.sourceWhPoint.y );
		this.bitmapData.copyRect( this.imageName, new Phaser.Rectangle(
			this.targetXyPoint.x, this.targetXyPoint.y,
			this.sourceWhPoint.x, this.sourceWhPoint.y ), 
			this.sourceXyPoint.x, this.sourceXyPoint.y, 
			alpha );
	}

	public UpdateGridFrame( gridEdgeGraphic : Phaser.Graphics, 
		showFrame : boolean ) {
        if ( showFrame ) {
            gridEdgeGraphic.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR, 1);
            console.log ( "" + this.sourceXyPoint.x + " : " + this.sourceXyPoint.y)
            FkUtil.strokeRect( gridEdgeGraphic,
                this.sourceXyPoint.x, this.sourceXyPoint.y, 
                this.sourceWhPoint.x, this.sourceWhPoint.y );
            FkUtil.strokeRect( gridEdgeGraphic,
                this.sourceXyPoint.x, this.sourceXyPoint.y, 
                this.sourceWhPoint.x, this.sourceWhPoint.y );
            FkUtil.strokeRect( gridEdgeGraphic,
                this.sourceXyPoint.x, this.sourceXyPoint.y, 
                this.sourceWhPoint.x, this.sourceWhPoint.y );
            FkUtil.strokeRect( gridEdgeGraphic,
                this.sourceXyPoint.x, this.sourceXyPoint.y, 
                this.sourceWhPoint.x, this.sourceWhPoint.y );
        }
	}
}