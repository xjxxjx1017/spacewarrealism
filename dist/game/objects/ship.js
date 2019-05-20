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
import 'phaser';
import * as _ from 'lodash';
import { FkDestructibleObject, FkDstrGridData } from "../../components/destructibleobject";
import { EventShipBrush, EBrushType } from "../events/eventshipbrush";
import { Gun } from "../objects/gun";
import { EventStampType, EStampType } from "../events/eventplacestamp";
import { EventHpChanged } from "../events/eventhpchanged";
import { EventEntityUpdate } from "../events/evententityupdate";
import { FkSerializable } from "../../components/fkserializable";
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship() {
        return _super.call(this, Ship, "Ship", ["dataRect", "dataShipEntity", "dataGunList"], ["dataShipEntity", "dataGunList"]) || this;
    }
    Ship.prototype.init = function (_rect) {
        this.dataRect = _rect;
        // Init ship body entity and events
        this.dataShipEntity = new FkDestructibleObject().init(_rect.x, _rect.y, _rect.width, _rect.height, null);
        // Init guns on ship
        this.dataGunList = [];
        this.afterUnserializeInit();
        return this;
    };
    Ship.prototype.kill = function () {
        _super.prototype.kill.call(this);
        EventShipBrush.Manager.detach(this);
        EventStampType.Manager.detach(this);
        EventEntityUpdate.Manager.detach(this);
    };
    Ship.prototype.afterUnserializeInit = function () {
        var _this = this;
        var self = this;
        // Init events
        EventShipBrush.Manager.attach(this, function (id, evt) { self.onBrushDraw(evt); });
        EventStampType.Manager.attach(this, function (id, evt) { self.onPlaceStamp(evt); });
        EventEntityUpdate.Manager.attach(this, function (id, evt) {
            if (_this == id)
                self.onEntityUpdate(evt);
        });
        // Show Object
        this.dataShipEntity.drawDstrObject();
    };
    Ship.prototype.getHp = function () {
        return Math.floor(this.dataShipEntity.area(function (node) {
            return node.dataIsVisible;
        }) * 100);
    };
    Ship.prototype.onEntityUpdate = function (evt) {
        var hp = this.getHp();
        EventHpChanged.Manager.notify(new EventHpChanged(this, hp));
    };
    Ship.prototype.attack = function (_target) {
        var self = this;
        _.forEach(self.dataGunList, function (g) {
            g.attack(_target, 20);
        });
    };
    Ship.prototype.attackedByLine = function (_srcPoint, _targetPoint, _strength) {
        var self = this;
        self.dataShipEntity.modifyByLine(_srcPoint.x, _srcPoint.y, _targetPoint.x, _targetPoint.y, _strength, FkDstrGridData.getStateHide());
        self.dataShipEntity.drawDstrObject();
        var toRemove = [];
        _.forEach(self.dataGunList, function (g) {
            var b = self.dataShipEntity.collisionWithPoint(g.dataPos, FkDstrGridData.getStateVisible());
            if (!b)
                toRemove.push(g);
        });
        _.forEach(toRemove, function (g) {
            g.destroy();
            _.pull(self.dataGunList, g);
        });
    };
    Ship.prototype.onPlaceStamp = function (_evt) {
        if (!this.dataShipEntity.collisionWithPoint(_evt.pos, FkDstrGridData.getStateVisible()))
            return;
        switch (_evt.type) {
            case EStampType.STAMP_TURRET_RED:
                var g = new Gun().init(new Phaser.Geom.Point(_evt.pos.x, _evt.pos.y));
                this.dataGunList.push(g);
                break;
            default:
                console.log("Brush not found.");
                break;
        }
    };
    Ship.prototype.onBrushDraw = function (_evt) {
        switch (_evt.brushType) {
            case EBrushType.BRUSH_NORMAL:
                this.dataShipEntity.modifyByCircle(new Phaser.Geom.Circle(_evt.pos.x, _evt.pos.y, _evt.brushSize), FkDstrGridData.getStateVisible());
                this.dataShipEntity.drawDstrObject();
                break;
            case EBrushType.BRUSH_ERASE:
                this.dataShipEntity.modifyByCircle(new Phaser.Geom.Circle(_evt.pos.x, _evt.pos.y, _evt.brushSize), FkDstrGridData.getStateHide());
                this.dataShipEntity.drawDstrObject();
                break;
            default:
                console.log("Brush not found.");
                break;
        }
    };
    Ship.prototype.getIsAlive = function () {
        return this.dataGunList.length > 0;
    };
    Ship.prototype.getTargetPoint = function (_source) {
        var MULTI = 10;
        var x = (Math.random() * this.dataRect.width + this.dataRect.x - _source.x) * MULTI;
        var y = (Math.random() * this.dataRect.height + this.dataRect.y - _source.y) * MULTI;
        return new Phaser.Geom.Point(_source.x + x, _source.y + y);
    };
    return Ship;
}(FkSerializable));
export { Ship };
//# sourceMappingURL=ship.js.map