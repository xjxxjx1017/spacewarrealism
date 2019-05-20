import "phaser";
import { EventManager } from "./eventmanager";
export var EnumCheckCondition;
(function (EnumCheckCondition) {
    EnumCheckCondition[EnumCheckCondition["CONDITION_GAME_WIN"] = 0] = "CONDITION_GAME_WIN";
})(EnumCheckCondition || (EnumCheckCondition = {}));
var EventCheckCondition = /** @class */ (function () {
    function EventCheckCondition() {
    }
    EventCheckCondition.Manager = new EventManager();
    return EventCheckCondition;
}());
export { EventCheckCondition };
//# sourceMappingURL=eventcheckcondition.js.map