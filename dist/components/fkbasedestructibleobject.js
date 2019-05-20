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
import * as _ from 'lodash';
import { FkSerializable } from './fkserializable';
import { FkQuadTree } from "./fkquadtree";
var FkBaseDstrGridData = /** @class */ (function (_super) {
    __extends(FkBaseDstrGridData, _super);
    function FkBaseDstrGridData(_classType, _keyList, _killKeyList) {
        return _super.call(this, _classType, _keyList, _killKeyList) || this;
    }
    FkBaseDstrGridData.prototype.afterUnserializeInit = function () { };
    return FkBaseDstrGridData;
}(FkSerializable));
export { FkBaseDstrGridData };
var FkBaseDestructibleObject = /** @class */ (function (_super) {
    __extends(FkBaseDestructibleObject, _super);
    function FkBaseDestructibleObject(_classType, _keyList, _killKeyList) {
        return _super.call(this, _classType, _keyList.concat(["dataBody", "dataPos"]), _killKeyList.concat(["dataBody"])) || this;
    }
    FkBaseDestructibleObject.prototype.afterUnserializeInit = function () { };
    FkBaseDestructibleObject.prototype.baseInit = function (_posX, _posY, _maxWidth, _maxHeight, _draw, _initState) {
        console.log("Object size: " + _maxWidth + "x" + _maxHeight + ", pixels: " + _maxWidth * _maxHeight);
        var depthW = Math.ceil(Math.log2(_maxWidth) + 1);
        var depthH = Math.ceil(Math.log2(_maxHeight) + 1);
        this.dataPos = new Phaser.Geom.Point(_posX, _posY);
        this.dataBody = new FkQuadTree().init(0, 0, _maxWidth, _maxHeight, Math.max(depthH, depthW), _initState);
    };
    FkBaseDestructibleObject.prototype.draw = function (_triggerDraw) {
        this.dataBody.draw(_triggerDraw);
    };
    FkBaseDestructibleObject.prototype.area = function (_matchFunc) {
        return this.dataBody.area(1, _matchFunc);
    };
    FkBaseDestructibleObject.prototype.modifyByDstrObject = function (_g, _stateToChangeFromSource, _stateNewOnTarget) {
        this.dataBody.updateWithQuadTree(_g.dataBody, function (_data) {
            if (_.isEqual(_data, _stateToChangeFromSource))
                return _stateNewOnTarget;
            else
                return null;
        });
    };
    FkBaseDestructibleObject.prototype.modifyByCircle = function (_g, _sNew, _isRelative) {
        if (_isRelative === void 0) { _isRelative = false; }
        if (_isRelative)
            this.dataBody.updateWithCircle(_g, _sNew);
        else
            this.dataBody.updateWithCircle(new Phaser.Geom.Circle(_g.x - this.dataPos.x, _g.y - this.dataPos.y, _g.radius), _sNew);
    };
    FkBaseDestructibleObject.prototype.modifyByRectangle = function (_g, _sNew, _isRelative) {
        if (_isRelative === void 0) { _isRelative = false; }
        if (_isRelative)
            this.dataBody.updateWithRectangle(_g, _sNew);
        else
            this.dataBody.updateWithRectangle(new Phaser.Geom.Rectangle(_g.x - this.dataPos.x, _g.y - this.dataPos.y, _g.width, _g.height), _sNew);
    };
    FkBaseDestructibleObject.prototype.modifyByTriangle = function (_g, _sNew, _isRelative) {
        if (_isRelative === void 0) { _isRelative = false; }
        if (_isRelative)
            this.dataBody.updateWithTriangle(_g, _sNew);
        else
            this.dataBody.updateWithTriangle(new Phaser.Geom.Triangle(_g.x1 - this.dataPos.x, _g.y1 - this.dataPos.y, _g.x2 - this.dataPos.x, _g.y2 - this.dataPos.y, _g.x3 - this.dataPos.x, _g.y3 - this.dataPos.y), _sNew);
    };
    FkBaseDestructibleObject.prototype.modifyByLine = function (_x1, _y1, _x2, _y2, _w, _sNew, _isRelative) {
        if (_isRelative === void 0) { _isRelative = false; }
        if (_isRelative)
            this.dataBody.updateWithLine(_x1, _y1, _x2, _y2, _w, _sNew);
        else
            this.dataBody.updateWithLine(_x1 - this.dataPos.x, _y1 - this.dataPos.y, _x2 - this.dataPos.x, _y2 - this.dataPos.y, _w, _sNew);
    };
    FkBaseDestructibleObject.prototype.collisionWithPoint = function (_g, _sData) {
        return this.dataBody.collisionWithPoint(new Phaser.Geom.Point(_g.x - this.dataPos.x, _g.y - this.dataPos.y), _sData);
    };
    FkBaseDestructibleObject.prototype.collisionWithMovingPoint = function (_g1, _g2, _sData) {
        var p = this.dataBody.collisionWithMovingPoint(new Phaser.Geom.Point(_g1.x - this.dataPos.x, _g1.y - this.dataPos.y), new Phaser.Geom.Point(_g2.x - this.dataPos.x, _g2.y - this.dataPos.y), _sData);
        if (p != null)
            return new Phaser.Geom.Point(this.dataPos.x + p.x, this.dataPos.y + p.y);
        else
            return null;
    };
    FkBaseDestructibleObject.prototype.collisionWithDstrObject = function (_g, _sData) {
        return this.dataBody.collisionWithQuadTree(new Phaser.Geom.Point(_g.dataPos.x - this.dataPos.x, _g.dataPos.y - this.dataPos.y), _g.dataBody, _sData);
    };
    FkBaseDestructibleObject.prototype.collisionWithMovingDstrObject = function (_g1, _p2, _sData) {
        return this.dataBody.collisionWithMovingQuadTree(new Phaser.Geom.Point(_g1.dataPos.x - this.dataPos.x, _g1.dataPos.y - this.dataPos.y), new Phaser.Geom.Point(_p2.x - this.dataPos.x, _p2.y - this.dataPos.y), _g1.dataBody, _sData);
    };
    FkBaseDestructibleObject.prototype.saveToString = function () {
        return "";
    };
    FkBaseDestructibleObject.prototype.loadFromString = function () {
        return "";
    };
    return FkBaseDestructibleObject;
}(FkSerializable));
export { FkBaseDestructibleObject };
//# sourceMappingURL=fkbasedestructibleobject.js.map