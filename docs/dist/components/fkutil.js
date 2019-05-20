import 'phaser';
var FkUtil = /** @class */ (function () {
    function FkUtil() {
    }
    FkUtil.strokeRect = function (_graphics, _x, _y, _w, _h) {
        _graphics.moveTo(_x, _y);
        _graphics.lineTo(_x + _w, _y);
        _graphics.lineTo(_x + _w, _y + _h);
        _graphics.lineTo(_x, _y + _h);
        _graphics.lineTo(_x, _y);
    };
    FkUtil.snapToPos = function (a, m) {
        return Math.floor(a / m) * m;
    };
    FkUtil.snapToXy = function (a, m) {
        return Math.floor(a / m);
    };
    return FkUtil;
}());
export { FkUtil };
//# sourceMappingURL=fkutil.js.map