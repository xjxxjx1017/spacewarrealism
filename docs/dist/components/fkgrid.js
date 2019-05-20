import { FkUtil } from "./fkutil";
/*
//////////////////////////////
+++ Example usage
//////////////////////////////
var g = new FkGrid(
    game, 'ship',
    cropXy, cropWH, displayXy, false );
*/
var FkGrid = /** @class */ (function () {
    function FkGrid(_bitmapData, _imageName, _sourceXy, _sourceWh, _targetXy) {
        this.FRAME_COLOR = 0x00ff00;
        this.FRAME_WIDTH = 2;
        this.layerBitmapData = _bitmapData;
        this.resImageName = _imageName;
        this.dataSourceXy = _sourceXy;
        this.dataSourceWh = _sourceWh;
        this.dataTargetXy = _targetXy;
    }
    FkGrid.prototype.Draw = function (alpha) {
        this.layerBitmapData.clear(this.dataSourceXy.x, this.dataSourceXy.y, this.dataSourceWh.x, this.dataSourceWh.y);
        this.layerBitmapData.copyRect(this.resImageName, new Phaser.Rectangle(this.dataTargetXy.x, this.dataTargetXy.y, this.dataSourceWh.x, this.dataSourceWh.y), this.dataSourceXy.x, this.dataSourceXy.y, alpha);
    };
    FkGrid.prototype.UpdateGridFrame = function (gridEdgeGraphic, showFrame) {
        if (showFrame) {
            gridEdgeGraphic.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR, 1);
            FkUtil.strokeRect(gridEdgeGraphic, this.dataSourceXy.x, this.dataSourceXy.y, this.dataSourceWh.x, this.dataSourceWh.y);
        }
    };
    return FkGrid;
}());
export { FkGrid };
//# sourceMappingURL=fkgrid.js.map