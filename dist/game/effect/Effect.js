import "phaser";
import { GameData } from "../objects/gamedata";
var Effect = /** @class */ (function () {
    function Effect() {
    }
    Effect.createShootEffect = function (_p1, _p2) {
        if (Effect.effectManagerGun == null) {
            Effect.effectManagerGun = GameData.inst.add.group({
                defaultKey: "red_laser",
                maxSize: 10
            });
        }
        var group = Effect.effectManagerGun;
        var eff = group.get();
        if (!eff)
            return;
        var angle = Math.atan((_p2.y - _p1.y) / (_p2.x - _p1.x));
        if (_p2.x - _p1.x < 0)
            angle += Math.PI;
        var dx = Math.cos(angle) * eff.height / 2;
        var dy = Math.sin(angle) * eff.height / 2;
        eff.setActive(true).setVisible(true).setAlpha(1).setRotation(angle + Math.PI / 2).setX(_p1.x + dx).setY(_p1.y + dy);
        GameData.inst.tweens.add({
            targets: eff,
            alpha: 0,
            duration: 1000,
            ease: "Power3",
            onComplete: function (t) {
                if (t && t.targets && t.targets[0])
                    group.killAndHide(t.targets[0]);
            },
            onCompleteScope: this
        });
    };
    Effect.effectManagerGun = null;
    return Effect;
}());
export { Effect };
//# sourceMappingURL=Effect.js.map