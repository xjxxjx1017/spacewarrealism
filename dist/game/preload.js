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
import { FkCounter } from '../components/fkcounter';
var Preload = /** @class */ (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        return _super.call(this, {
            key: "Preload"
        }) || this;
    }
    Preload.prototype.preload = function () {
        this.load.image('ship', 'assets/ship.jpg');
        this.load.image('ship-body', 'assets/ship-body.png');
        this.load.image('ship-body-light', 'assets/ship-body-light.png');
        this.load.image('space', 'assets/space.png');
        this.load.image('button_normal', 'assets/button/normal.png');
        this.load.image('button_hover', 'assets/button/hover.png');
        this.load.image('button_down', 'assets/button/down.png');
        this.load.image('overlay_ship', 'assets/buttonoverlay/ship.png');
        this.load.image('overlay_missle', 'assets/buttonoverlay/missle.png');
        this.load.image('overlay_grass', 'assets/buttonoverlay/grass.png');
        this.load.image('overlay_nohuman', 'assets/buttonoverlay/nohuman.png');
        this.load.image('red_turret', 'assets/sprites/2019.04.01.Turret.png');
        this.load.image('red_laser', 'assets/sprites/2019.04.01.Line.png');
    };
    Preload.prototype.create = function () {
        var _this = this;
        var lC = new FkCounter();
        lC.InitTriggerAfter(1, function () { return _this.nextStage(); });
        // this.game.create.grid( 'drawingGrid', 
        // 	cellR * cellCountWH.x, cellR * cellCountWH.y, 
        //         cellR, cellR, 'rgba(0,191,243,0.8)', 
        //         undefined, () => lC.AddCount() );
        this.nextStage();
    };
    Preload.prototype.nextStage = function () {
        this.scene.start('Core');
    };
    return Preload;
}(Phaser.Scene));
export { Preload };
//# sourceMappingURL=preload.js.map