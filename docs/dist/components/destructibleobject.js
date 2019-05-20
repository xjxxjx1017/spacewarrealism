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
import { FkBaseDestructibleObject, FkBaseDstrGridData } from "./fkbasedestructibleobject";
import { GameData } from "../game/objects/gamedata";
import { EventEntityUpdate } from "../game/events/evententityupdate";
var FkDstrGridData = /** @class */ (function (_super) {
    __extends(FkDstrGridData, _super);
    function FkDstrGridData() {
        return _super.call(this, "FkDstrGridData", ["dataIsVisible"], []) || this;
    }
    FkDstrGridData.prototype.init = function (_isVisible) {
        this.dataIsVisible = _isVisible;
        return this;
    };
    FkDstrGridData.getStateVisible = function () {
        return new FkDstrGridData().init(true);
    };
    FkDstrGridData.getStateHide = function () {
        return new FkDstrGridData().init(false);
    };
    return FkDstrGridData;
}(FkBaseDstrGridData));
export { FkDstrGridData };
var FkDestructibleObject = /** @class */ (function (_super) {
    __extends(FkDestructibleObject, _super);
    function FkDestructibleObject() {
        var _this = _super.call(this, "FkDestructibleObject", ["dataRenderTexture"], []) || this;
        _this.IS_DEBUG = true;
        _this.FRAME_COLOR = 0x00ff00;
        _this.FRAME_FILL_COLOR = 0x004400;
        _this.FRAME_COLOR_HIDDEN = 0xff0000;
        _this.FRAME_WIDTH = 1;
        _this.dataRenderTexture = null;
        _this.debugDrawCounter = 0;
        return _this;
    }
    FkDestructibleObject.prototype.init = function (_posX, _posY, _maxWidth, _maxHeight, _renderTexture) {
        var _this = this;
        if (_renderTexture === void 0) { _renderTexture = null; }
        this.baseInit(_posX, _posY, _maxWidth, _maxHeight, function (_rect, _data) { _this.render(_rect, _data); }, FkDstrGridData.getStateVisible());
        this.afterUnserializeInit();
        return this;
    };
    FkDestructibleObject.prototype.kill = function () {
        _super.prototype.kill.call(this);
        if (this.layerGridEdge) {
            this.layerGridEdge.destroy();
            this.layerGridEdge = null;
        }
        if (this.layerTexture) {
            this.layerTexture.destroy();
            this.layerTexture = null;
        }
    };
    FkDestructibleObject.prototype.afterUnserializeInit = function () {
        if (this.dataRenderTexture != null) {
            this.layerGridEdge = GameData.inst.make.graphics({});
            this.layerGridEdge.setX(this.dataPos.x);
            this.layerGridEdge.setY(this.dataPos.y);
            this.layerTexture = GameData.inst.add.image(this.dataPos.x, this.dataPos.y, this.dataRenderTexture);
            this.layerTexture.setMask(this.layerGridEdge.createGeometryMask());
        }
        else {
            this.layerGridEdge = GameData.inst.add.graphics();
            this.layerGridEdge.setX(this.dataPos.x);
            this.layerGridEdge.setY(this.dataPos.y);
        }
    };
    FkDestructibleObject.prototype.drawDstrObject = function () {
        var _this = this;
        this.layerGridEdge.clear();
        this.debugDrawCounter = 0;
        this.draw(function (_rect, _data) { _this.render(_rect, _data); });
        EventEntityUpdate.Manager.notify(new EventEntityUpdate());
        // console.log( "Draw: " + this.debugDrawCounter + " rects" );
    };
    FkDestructibleObject.prototype.render = function (_rect, _data) {
        if (this.dataRenderTexture != null) {
            this.renderTexture(_rect, _data);
            return;
        }
        this.renderFrame(_rect, _data);
        return;
    };
    FkDestructibleObject.prototype.renderFrame = function (_rect, _data) {
        if (_data.dataIsVisible) {
            this.debugDrawCounter++;
            this.layerGridEdge.fillStyle(this.FRAME_FILL_COLOR);
            this.layerGridEdge.fillRectShape(_rect);
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR, 1);
            this.layerGridEdge.strokeRect(_rect.x, _rect.y, _rect.width, _rect.height);
        }
        else {
            if (this.IS_DEBUG) {
                this.debugDrawCounter++;
                this.layerGridEdge.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR_HIDDEN, 1);
                this.layerGridEdge.strokeRect(_rect.x, _rect.y, _rect.width, _rect.height);
            }
        }
    };
    FkDestructibleObject.prototype.renderTexture = function (_rect, _data) {
        if (_data.dataIsVisible) {
            this.debugDrawCounter++;
            this.layerGridEdge.lineStyle(this.FRAME_WIDTH, this.FRAME_COLOR, 1);
            this.layerGridEdge.fillStyle(this.FRAME_FILL_COLOR, 1);
            this.layerGridEdge.fillRect(_rect.x, _rect.y, _rect.width, _rect.height);
        }
    };
    FkDestructibleObject.firstCollidePointForMovingPointToDstrObjectList = function (_objList, _p1, _p2, _sData) {
        var min_len = Number.MAX_VALUE;
        var collidePoint = null;
        _objList.forEach(function (obj) {
            var pp = obj.collisionWithMovingPoint(_p1, _p2, _sData);
            if (pp != null) {
                var len = (pp.x - _p1.x) * (pp.x - _p1.x) + (pp.y - _p1.y) * (pp.y - _p1.y);
                if (min_len > len) {
                    collidePoint = pp;
                    min_len = len;
                }
            }
        });
        return collidePoint;
    };
    return FkDestructibleObject;
}(FkBaseDestructibleObject));
export { FkDestructibleObject };
//# sourceMappingURL=destructibleobject.js.map