import "phaser";
var FkWithMouse = /** @class */ (function () {
    function FkWithMouse(_game) {
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
    }
    FkWithMouse.prototype.LoadImage = function (_srcName) {
        this.dataIsActive = true;
        if (this.dataSprite == null) {
            var cfg = {
                key: _srcName,
                x: 100, y: 100,
                scale: {
                    x: 0.2, y: 0.2
                }
            };
            this.dataSprite = this.dataGame.make.sprite(cfg, true);
        }
        else {
            this.dataSprite.setVisible(true);
            this.dataSprite.setTexture(_srcName);
        }
    };
    FkWithMouse.prototype.UnloadImage = function () {
        this.dataIsActive = false;
        this.dataSprite.setVisible(false);
    };
    return FkWithMouse;
}());
export { FkWithMouse };
//# sourceMappingURL=fkwithmouse.js.map