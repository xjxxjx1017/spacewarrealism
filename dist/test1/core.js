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
import 'phaser';
var Core = /** @class */ (function (_super) {
    __extends(Core, _super);
    function Core() {
        return _super.call(this, {
            key: "Core"
        }) || this;
    }
    Core.prototype.create = function () {
        this.text = this.add.bitmapText(200, 200, 'font', 'Press Arrows / Space', 15);
        this.text.x = this.text.x - ~~(this.text.width * 0.5);
    };
    return Core;
}(Phaser.Scene));
export { Core };
//# sourceMappingURL=core.js.map