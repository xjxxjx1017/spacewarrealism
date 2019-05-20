import "phaser";
import { EventWithMouse } from "../events/eventwithmouse";
var FkWithMouse = /** @class */ (function () {
    function FkWithMouse(_game) {
        this.dataSprite = null;
        this.dataIsActive = false;
        var self = this;
        // create a hidden sprite to track mouse
        this.dataGame = _game;
        this.dataGame.input.on("pointermove", function (_p) {
            if (self.dataIsActive && self.dataSprite != null) {
                self.dataSprite.setX(_p.x);
                self.dataSprite.setY(_p.y);
            }
        });
        EventWithMouse.Manager.attach(this, function (id, _evt) {
            _evt.isActive ?
                self.LoadImage(_evt.src) : self.UnloadImage();
        });
    }
    FkWithMouse.prototype.LoadImage = function (_srcName) {
        this.dataIsActive = true;
        if (this.dataSprite == null) {
            var cfg = {
                key: _srcName,
                x: 100, y: 100,
                scale: {
                    x: 0.5, y: 0.5
                }
            };
            this.dataSprite = this.dataGame.make.sprite(cfg, true);
            this.dataSprite.setAlpha(0.7);
        }
        else {
            this.dataSprite.setVisible(true);
            this.dataSprite.setTexture(_srcName);
        }
    };
    FkWithMouse.prototype.UnloadImage = function () {
        this.dataIsActive = false;
        if (this.dataSprite != null)
            this.dataSprite.setVisible(false);
    };
    return FkWithMouse;
}());
export { FkWithMouse };
//# sourceMappingURL=fkwithmouse.js.map