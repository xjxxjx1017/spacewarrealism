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
        var rt = this.add.renderTexture(0, 0, 400, 300);
        var mushroom = this.add.image(200, 100, 'mushroom').setVisible(false);
        rt.draw(mushroom);
        mushroom.setX(210);
        mushroom.setY(210);
        rt.draw(mushroom);
        rt.setX(30);
        rt.setY(30);
        // console.log( rt.textureManager.getPixel( 220, 220 ) );
    };
    return Core;
}(Phaser.Scene));
export { Core };
//# sourceMappingURL=core.js.map