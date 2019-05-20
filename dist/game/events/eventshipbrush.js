import "phaser";
import { EventManager } from "./eventmanager";
export var EBrushType;
(function (EBrushType) {
    EBrushType[EBrushType["BRUSH_NORMAL"] = 0] = "BRUSH_NORMAL";
    EBrushType[EBrushType["BRUSH_ERASE"] = 1] = "BRUSH_ERASE";
})(EBrushType || (EBrushType = {}));
;
var EventShipBrush = /** @class */ (function () {
    function EventShipBrush(_pos, _brushType, _brushSize) {
        this.pos = _pos;
        this.brushType = _brushType;
        this.brushSize = _brushSize;
    }
    EventShipBrush.Manager = new EventManager();
    return EventShipBrush;
}());
export { EventShipBrush };
//# sourceMappingURL=eventshipbrush.js.map