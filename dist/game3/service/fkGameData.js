import * as Phaser from 'phaser-ce';
import { FkGridCanvas } from "../../components/fkgridcanvas";
import { FkGrid } from "../../components/fkgrid";
import { FkImageButton } from "../../components/fkimagebutton";
var FkGameData = /** @class */ (function () {
    function FkGameData() {
    }
    FkGameData.inst = function () {
        if (this._inst == null)
            this._inst = new FkGameData();
        return this._inst;
    };
    FkGameData.prototype.Init = function (_game) {
        return this.dataGame = _game;
    };
    FkGameData.prototype.Run = function () {
        var _this = this;
        this.layerGridCanvas = new FkGridCanvas(this.dataGame, new Phaser.Point(30, 30), // target xy
        new Phaser.Point(40, 20), // target wh count
        new Phaser.Point(20, 20), // cell wh
        new Phaser.Point(0, 0), true); // source xy
        var c = this.dataGame.make.bitmapData(200, 200);
        c.rect(0, 0, c.width, c.height, '#3f5c67');
        c.addToWorld(200, 200);
        var g = new FkGrid(c, 'ship', new Phaser.Point(20, 20), new Phaser.Point(40, 40), new Phaser.Point(100, 100));
        g.Draw(1);
        // button
        var cC = 0;
        var cB1 = new FkImageButton(this.dataGame, 550, 50, 'button_normal', 'button_hover', 'button_down', 'overlay_ship', function () {
            _this.layerGridCanvas.SetIsEdit(!_this.layerGridCanvas.GetIsEdit());
        });
        var cB2 = new FkImageButton(this.dataGame, 550, 50 + 64 + 5, 'button_normal', 'button_hover', 'button_down', 'overlay_missle', function () {
            console.log(++cC);
        });
    };
    FkGameData.prototype.Update = function () {
    };
    FkGameData._inst = null;
    return FkGameData;
}());
export { FkGameData };
//# sourceMappingURL=fkgamedata.js.map