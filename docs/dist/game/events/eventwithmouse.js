import "phaser";
import { EventManager } from "./eventmanager";
var EventWithMouse = /** @class */ (function () {
    function EventWithMouse(_src) {
        this.isActive = _src != null;
        this.src = _src;
    }
    EventWithMouse.IMAGE_RED_TURRET = "red_turret";
    EventWithMouse.Manager = new EventManager();
    return EventWithMouse;
}());
export { EventWithMouse };
//# sourceMappingURL=eventwithmouse.js.map