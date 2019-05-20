import "phaser";
import { FkDstrGridData } from "../../components/destructibleobject";
var Laser = /** @class */ (function () {
    function Laser() {
    }
    Laser.prototype.attack = function (_pos, _ship) {
        _ship.dataShipEntity.modifyByCircle(new Phaser.Geom.Circle(_pos.x, _pos.y, 50), FkDstrGridData.getStateVisible());
        _ship.dataShipEntity.drawDstrObject();
    };
    return Laser;
}());
export { Laser };
//# sourceMappingURL=laser.js.map