import { FkGrid } from "./fkgrid";
var FkGridCanvas = /** @class */ (function () {
    function FkGridCanvas(_game, _targetXy, _targetWhCount, _sourceWh, _sourceXy, _isEdit) {
        this.ALIVE_ALPHA = 1;
        this.NORMAL_ALPHA = 0.3;
        this.NON_EDIT_ALIVE_ALPHA = 1;
        this.NON_EDIT_NORMAL_ALPHA = 0;
        this.HOVER_ALIVE_ALPHA = 1;
        this.HOVER_NORMAL_ALPHA = 0.8;
        this.FRAME_ALPHA = 1;
        this.dataIsEdit = false;
        this.dataIsEdit = _isEdit;
        this.resBrush1Name = 'ship';
        this.layerGridEdge = _game.add.graphics(_targetXy.x, _targetXy.y);
        this.layerGridEdge.alpha = this.FRAME_ALPHA;
        this.layerCanvas = _game.make.bitmapData(_targetWhCount.x * _sourceWh.x, _targetWhCount.y * _sourceWh.y);
        this.layerCanvas.addToWorld(_targetXy.x, _targetXy.y);
        // grid
        this.dataGrid = [];
        this.dataIsAlive = [];
        for (var i = 0; i < _targetWhCount.x; i++) {
            for (var j = 0; j < _targetWhCount.y; j++) {
                var idx = i * _targetWhCount.y + j;
                var isA = Math.random() > 0.5;
                var sXy = new Phaser.Point(_sourceXy.x + i * _sourceWh.x, _sourceXy.y + j * _sourceWh.y);
                var dXy = new Phaser.Point(i * _sourceWh.x, j * _sourceWh.y);
                var g = new FkGrid(this.layerCanvas, this.resBrush1Name, sXy, _sourceWh, dXy);
                this.dataGrid.push(g);
                this.dataIsAlive.push(isA);
            }
        }
        this.UpdateCanvas();
    }
    FkGridCanvas.prototype.GetIsEdit = function () {
        return this.dataIsEdit;
    };
    FkGridCanvas.prototype.SetIsEdit = function (b) {
        if (this.dataIsEdit == b)
            return;
        this.dataIsEdit = b;
        this.UpdateCanvas();
    };
    FkGridCanvas.prototype.UpdateCanvas = function () {
        for (var idx = 0; idx < this.dataGrid.length; idx++) {
            this.UpdateGridLook(idx);
        }
        this.UpdateGridEdges();
    };
    FkGridCanvas.prototype.ToggleAlive = function (idx) {
        this.dataIsAlive[idx] = !this.dataIsAlive[idx];
    };
    FkGridCanvas.prototype.UpdateGridLook = function (idx, isHovering) {
        if (isHovering === void 0) { isHovering = false; }
        var g = this.dataGrid[idx];
        var isA = this.dataIsAlive[idx];
        var a = this.dataIsEdit ?
            (isA ? this.ALIVE_ALPHA : this.NORMAL_ALPHA) :
            (isA ? this.NON_EDIT_ALIVE_ALPHA : this.NON_EDIT_NORMAL_ALPHA);
        if (this.dataIsEdit && isHovering)
            a = isA ? this.HOVER_ALIVE_ALPHA : this.HOVER_NORMAL_ALPHA;
        g.Draw(a);
    };
    FkGridCanvas.prototype.UpdateGridEdges = function () {
        // Grid update will update all the other grid edges ( to optimize )
        this.layerGridEdge.clear();
        for (var idx = 0; idx < this.dataGrid.length; idx++) {
            var g = this.dataGrid[idx];
            var isA = this.dataIsAlive[idx];
            var isD = this.dataIsEdit && isA;
            g.UpdateGridFrame(this.layerGridEdge, isD);
        }
    };
    return FkGridCanvas;
}());
export { FkGridCanvas };
//# sourceMappingURL=fkgridcanvas.js.map