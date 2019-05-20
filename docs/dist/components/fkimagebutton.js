import * as Phaser from 'phaser-ce';
var FkImageButton = /** @class */ (function () {
    function FkImageButton(_game, _x, _y, _normal, _hover, _down, _icon, _callback) {
        var _this = this;
        this.resNormal = _normal;
        this.resHover = _hover;
        this.resDown = _down;
        this.layerSpr = new Phaser.Sprite(_game, _x, _y, _normal);
        _game.add.existing(this.layerSpr);
        this.layerSpr.inputEnabled = true;
        this.layerSpr.events.onInputOver.add(this.enterButtonHoverState, this);
        this.layerSpr.events.onInputOut.add(this.enterButtonRestState, this);
        this.layerSpr.events.onInputDown.add(this.enterButtonActiveState, this);
        this.layerSpr.events.onInputUp.add(function () {
            _this.enterButtonHoverState();
            _callback();
        }, this);
        if (_icon != null) {
            _game.add.image(_x, _y, _icon);
        }
    }
    FkImageButton.prototype.enterButtonHoverState = function () {
        this.layerSpr.loadTexture(this.resHover);
    };
    FkImageButton.prototype.enterButtonRestState = function () {
        this.layerSpr.loadTexture(this.resNormal);
    };
    FkImageButton.prototype.enterButtonActiveState = function () {
        this.layerSpr.loadTexture(this.resDown);
    };
    return FkImageButton;
}());
export { FkImageButton };
//# sourceMappingURL=fkimagebutton.js.map