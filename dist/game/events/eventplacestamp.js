import "phaser";
import { EventManager } from "./eventmanager";
export var EStampType;
(function (EStampType) {
    EStampType[EStampType["STAMP_TURRET_RED"] = 0] = "STAMP_TURRET_RED";
    EStampType[EStampType["STAMP_SHIELD"] = 1] = "STAMP_SHIELD";
})(EStampType || (EStampType = {}));
;
var EventStampType = /** @class */ (function () {
    function EventStampType(_pos, _type) {
        this.pos = _pos;
        this.type = _type;
    }
    EventStampType.Manager = new EventManager();
    return EventStampType;
}());
export { EventStampType };
//# sourceMappingURL=eventplacestamp.js.map