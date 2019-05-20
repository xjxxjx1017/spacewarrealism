import * as Vue from 'vue';
import { EventShipBrush, EBrushType } from "../events/eventshipbrush";
import { EventStampType, EStampType } from "../events/eventplacestamp";
var PanelEditShip = /** @class */ (function () {
    function PanelEditShip(_game) {
        this.dataGame = _game;
        // Construct UI from Game logic loop
        this.dataVue = new Vue({
            el: '#vue-main-container',
            data: {
                out: {
                    dataBrushEnabled: false,
                    dataBrushType: EBrushType.BRUSH_ERASE,
                    dataBrushSize: 15,
                    dataStampEnabled: false,
                    dataStampType: EStampType.STAMP_TURRET_RED,
                },
                ui: {
                    statePosX: 15,
                    statePosY: 235,
                },
            }
        });
        this.initEvents();
    }
    Object.defineProperty(PanelEditShip.prototype, "out", {
        get: function () {
            return this.dataVue.out;
        },
        enumerable: true,
        configurable: true
    });
    PanelEditShip.prototype.initEvents = function () {
        var self = this;
        this.dataGame.input.on("pointerdown", function (_p) {
            self.eventDraw(_p);
            self.eventStamp(_p);
        });
        this.dataGame.input.on("pointermove", function (_p) {
            if (self.dataGame.input.mousePointer.isDown) {
                self.eventDraw(_p);
            }
        });
    };
    PanelEditShip.prototype.eventDraw = function (p) {
        if (!this.dataVue.out.dataBrushEnabled)
            return;
        var evt = new EventShipBrush(p, this.dataVue.out.dataBrushType, this.dataVue.out.dataBrushSize);
        EventShipBrush.Manager.notify(evt);
    };
    PanelEditShip.prototype.eventStamp = function (p) {
        if (!this.dataVue.out.dataStampEnabled)
            return;
        var evt = new EventStampType(p, this.dataVue.out.dataStampType);
        EventStampType.Manager.notify(evt);
    };
    return PanelEditShip;
}());
export { PanelEditShip };
//# sourceMappingURL=panel-edit-ship.js.map