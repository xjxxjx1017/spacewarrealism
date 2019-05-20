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
import "phaser";
import { Effect } from "../effect/Effect";
import { FkSerializable } from "../../components/fkserializable";
import { GameData } from "./gamedata";
var Gun = /** @class */ (function (_super) {
    __extends(Gun, _super);
    function Gun() {
        return _super.call(this, "Gun", ["dataPos", "dataIsAlive"], []) || this;
    }
    Gun.prototype.init = function (_pos) {
        this.dataPos = _pos;
        this.dataIsAlive = true;
        this.afterUnserializeInit();
        return this;
    };
    Gun.prototype.kill = function () {
        _super.prototype.kill.call(this);
        if (this.dataSprite) {
            this.dataSprite.destroy();
            this.dataSprite = null;
        }
    };
    Gun.prototype.afterUnserializeInit = function () {
        var cfg = {
            key: Gun.IMAGE_RED_TURRET,
            x: this.dataPos.x, y: this.dataPos.y,
            scale: {
                x: 0.5, y: 0.5
            }
        };
        this.dataSprite = GameData.inst.make.sprite(cfg, true);
    };
    Gun.prototype.destroy = function () {
        this.dataSprite.destroy();
        this.dataSprite = null;
    };
    Gun.prototype.attack = function (_target, _strength) {
        var targetP = _target.getTargetPoint(this.dataPos);
        _target.attackedByLine(this.dataPos, targetP, _strength);
        Effect.createShootEffect(this.dataPos, targetP);
    };
    Gun.IMAGE_RED_TURRET = "red_turret";
    return Gun;
}(FkSerializable));
export { Gun };
//# sourceMappingURL=gun.js.map