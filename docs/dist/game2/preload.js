var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as Phaser from 'phaser-ce';
var Preload = /** @class */ (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.countLoaded = 0;
        _this.RES_TO_LOAD = 3;
        return _this;
    }
    Preload.prototype.preload = function () { };
    Preload.prototype.create = function () {
        var self = this;
        this.game.create.grid('uiGrid', 32 * 16, 32, 32, 32, 'rgba(255,255,255,0.5)', undefined, function () { self.countLoaded++; });
        var canvasZoom = 32;
        this.game.create.grid('drawingGrid', 16 * canvasZoom, 16 * canvasZoom, canvasZoom, canvasZoom, 'rgba(0,191,243,0.8)', undefined, function () { self.countLoaded++; });
        var arrow = [
            '  22  ',
            ' 2222 ',
            '222222',
            '  22  ',
            '  22  '
        ];
        this.game.create.texture('arrow', arrow, 2, undefined, undefined, undefined, function () { self.countLoaded++; });
    };
    Preload.prototype.update = function () {
        if (this.countLoaded >= this.RES_TO_LOAD) {
            this.game.state.start('Core');
        }
    };
    return Preload;
}(Phaser.State));
export { Preload };
//# sourceMappingURL=preload.js.map