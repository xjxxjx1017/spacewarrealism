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
import { FkGameData } from './service/fkgamedata';
var Core = /** @class */ (function (_super) {
    __extends(Core, _super);
    function Core() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Core.prototype.create = function () {
        var g = this.game;
        FkGameData.inst().Init(g);
        FkGameData.inst().Run();
    };
    Core.prototype.update = function () {
        FkGameData.inst().Update();
    };
    return Core;
}(Phaser.State));
export { Core };
//# sourceMappingURL=core.js.map