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
import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';
import { Config } from '../default/config';
import { Boot } from '../default/boot';
import { Preload } from './preload';
import { Core } from './core';
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this, Config.gameWidth, Config.gameHeight, Phaser.CANVAS, 'content', null) || this;
        _this.state.add('Boot', Boot, false);
        _this.state.add('Preload', Preload, false);
        _this.state.add('Core', Core, false);
        _this.state.start('Boot');
        return _this;
    }
    return Main;
}(Phaser.Game));
export { Main };
//# sourceMappingURL=main.js.map