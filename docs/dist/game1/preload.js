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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preload.prototype.preload = function () {
        // Load awesome fonts
        this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
        // Load sprite
        this.game.load.image('mushroom', 'assets/sprites/mushroom.png');
        this.game.load.image('ship', 'assets/ship.jpg');
        this.game.load.image('space', 'assets/space.png');
        this.game.load.image('button_normal', 'assets/button/normal.png');
        this.game.load.image('button_hover', 'assets/button/hover.png');
        this.game.load.image('button_down', 'assets/button/down.png');
        this.game.load.image('overlay_ship', 'assets/buttonoverlay/ship.png');
        this.game.load.image('overlay_missle', 'assets/buttonoverlay/missle.png');
        this.game.load.image('overlay_grass', 'assets/buttonoverlay/grass.png');
        this.game.load.image('overlay_nohuman', 'assets/buttonoverlay/nohuman.png');
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    };
    Preload.prototype.create = function () {
    };
    Preload.prototype.update = function () {
        if (this.ready === true) {
            this.game.state.start('Core');
        }
    };
    Preload.prototype.onLoadComplete = function () {
        this.ready = true;
    };
    return Preload;
}(Phaser.State));
export { Preload };
//# sourceMappingURL=preload.js.map