import "phaser";
import { EventManager } from "./eventmanager";
var EventHpChanged = /** @class */ (function () {
    function EventHpChanged(_ship, _hp) {
        this.ship = _ship;
        this.hp = _hp;
    }
    EventHpChanged.Manager = new EventManager();
    return EventHpChanged;
}());
export { EventHpChanged };
//# sourceMappingURL=eventhpchanged.js.map