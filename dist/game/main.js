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
import { Preload } from './preload';
import { Core } from './core';
// UI libraries
import * as Vue from 'vue';
import 'element-ui';
import 'element_ui_css';
// import other components
import './ui-components/panel-edit-ship';
import "./ui-style/main.scss";
import "./ui-style/ui-theme.scss";
import "./ui-style/panel-edit-ship.scss";
import "./ui-style/panel-information.scss";
import "./ui-style/panel-game-state.scss";
var config = {
    width: 1200,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [Preload, Core],
    backgroundColor: "#cccccc",
    render: { pixelArt: false, antialias: true, autoResize: false }
};
Vue.use(ElementUI);
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super.call(this, config) || this;
    }
    return Main;
}(Phaser.Game));
export { Main };
//# sourceMappingURL=main.js.map