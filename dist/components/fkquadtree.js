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
import { FkSerializable } from './fkserializable';
var FkQuadTree = /** @class */ (function (_super) {
    __extends(FkQuadTree, _super);
    function FkQuadTree() {
        return _super.call(this, "FkQuadTree", ["resDepth", "dataRect", "dataNode", "dataSubTree"], ["dataNode", "dataSubTree"]) || this;
    }
    FkQuadTree.prototype.init = function (_x, _y, _w, _h, _depth, _data) {
        this.resDepth = _depth;
        this.dataNode = _data;
        this.dataRect = new Phaser.Geom.Rectangle(_x, _y, _w, _h);
        this.dataSubTree = null;
        return this;
    };
    FkQuadTree.prototype.afterUnserializeInit = function () { };
    FkQuadTree.prototype.area = function (_fraction, _matchFunc) {
        if (_matchFunc == null)
            return 0;
        if (this.dataSubTree == null)
            return _matchFunc(this.dataNode) ? _fraction : 0;
        else {
            var sum = 0;
            for (var i = 0; i < this.dataSubTree.length; i++) {
                var t = this.dataSubTree[i];
                sum += t.area(_fraction * 0.25, _matchFunc);
            }
            return sum;
        }
    };
    FkQuadTree.prototype.updateWithLine = function (_x1, _y1, _x2, _y2, _w, _dataChangeOnContain) {
        var theta = Math.atan((_y2 - _y1) / (_x2 - _x1));
        var p1 = new Phaser.Geom.Rectangle(_x1 - Math.sin(theta) * _w / 2, _y1 + Math.cos(theta) * _w / 2);
        var p2 = new Phaser.Geom.Rectangle(_x1 + Math.sin(theta) * _w / 2, _y1 - Math.cos(theta) * _w / 2);
        var p3 = new Phaser.Geom.Rectangle(_x2 + Math.sin(theta) * _w / 2, _y2 - Math.cos(theta) * _w / 2);
        var p4 = new Phaser.Geom.Rectangle(_x2 - Math.sin(theta) * _w / 2, _y2 + Math.cos(theta) * _w / 2);
        var tr1 = new Phaser.Geom.Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        var tr2 = new Phaser.Geom.Triangle(p1.x, p1.y, p3.x, p3.y, p4.x, p4.y);
        this.updateWithTriangle(tr1, _dataChangeOnContain);
        this.updateWithTriangle(tr2, _dataChangeOnContain);
    };
    FkQuadTree.prototype.updateWithRectangle = function (_g, _dataChangeOnContain) {
        if (Phaser.Geom.Rectangle.ContainsRect(_g, this.dataRect)) {
            this.foldSubTreesToParent(_dataChangeOnContain);
            return;
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.dataRect, _g)
            || (Phaser.Geom.Rectangle.ContainsRect(this.dataRect, _g))) {
            this.updateSubtrees(_dataChangeOnContain, function (_tree, _data) {
                _tree.updateWithRectangle(_g, _data);
            });
        }
    };
    FkQuadTree.prototype.updateWithTriangle = function (_g, _dataChangeOnContain) {
        if (Phaser.Geom.Triangle.Contains(_g, this.dataRect.x, this.dataRect.y)
            && Phaser.Geom.Triangle.Contains(_g, this.dataRect.x + this.dataRect.width, this.dataRect.y)
            && Phaser.Geom.Triangle.Contains(_g, this.dataRect.x, this.dataRect.y + this.dataRect.height)
            && Phaser.Geom.Triangle.Contains(_g, this.dataRect.x + this.dataRect.width, this.dataRect.y + this.dataRect.height)) {
            this.foldSubTreesToParent(_dataChangeOnContain);
            return;
        }
        if (Phaser.Geom.Intersects.RectangleToTriangle(this.dataRect, _g)
            || (Phaser.Geom.Rectangle.Contains(this.dataRect, _g.x1, _g.y1)
                && Phaser.Geom.Rectangle.Contains(this.dataRect, _g.x2, _g.y2)
                && Phaser.Geom.Rectangle.Contains(this.dataRect, _g.x3, _g.y3))) {
            this.updateSubtrees(_dataChangeOnContain, function (_tree, _data) {
                _tree.updateWithTriangle(_g, _data);
            });
        }
    };
    FkQuadTree.prototype.updateWithCircle = function (_g, _dataChangeOnContain) {
        if (Phaser.Geom.Circle.ContainsRect(_g, this.dataRect)) {
            this.foldSubTreesToParent(_dataChangeOnContain);
            return;
        }
        if (Phaser.Geom.Intersects.CircleToRectangle(_g, this.dataRect)
            || Phaser.Geom.Rectangle.Contains(this.dataRect, _g.x, _g.y)) {
            this.updateSubtrees(_dataChangeOnContain, function (_tree, _data) {
                _tree.updateWithCircle(_g, _data);
            });
        }
    };
    FkQuadTree.prototype.updateWithQuadTree = function (_g, _updateDataFunc) {
        if (_g.dataSubTree == null) {
            var data = _updateDataFunc(_g.dataNode);
            if (data != null)
                this.updateWithRectangle(_g.dataRect, data);
        }
        else {
            for (var i = 0; i < _g.dataSubTree.length; i++) {
                var t = _g.dataSubTree[i];
                this.updateWithQuadTree(t, _updateDataFunc);
            }
        }
    };
    FkQuadTree.prototype.updateSubtrees = function (_dataToUpdate, _callback) {
        if (this.resDepth > 0) {
            if (this.dataSubTree == null)
                this.createAllSubTrees();
            for (var i = 0; i < this.dataSubTree.length; i++) {
                var t = this.dataSubTree[i];
                _callback(t, _dataToUpdate);
            }
            // At this point, all sub trees has been updated.
            // Check whether all subtrees hold the same value
            // If they do, they are redundant and can be represent by using only parent tree. 
            // So fold them back to parent tree
            this.clearRedendantSubTrees();
        }
        else
            this.foldSubTreesToParent(_dataToUpdate);
    };
    FkQuadTree.prototype.draw = function (_triggerDraw) {
        var self = this;
        if (this.dataSubTree != null) {
            this.dataSubTree.forEach(function (q) {
                q.draw(_triggerDraw);
            });
        }
        else
            _triggerDraw(self.dataRect, self.dataNode);
    };
    FkQuadTree.prototype.collisionWithPoint = function (_g, _sData) {
        if (!this.dataRect.contains(_g.x, _g.y))
            return false;
        if (this.dataSubTree != null) {
            var b = false;
            for (var i = 0; i < this.dataSubTree.length; i++) {
                b = b || this.dataSubTree[i].collisionWithPoint(_g, _sData);
            }
            return b;
        }
        else
            return _.isEqual(this.dataNode, _sData);
    };
    FkQuadTree.prototype.collisionWithMovingPoint = function (_g1, _g2, _sData) {
        var targetLine = new Phaser.Geom.Line(_g1.x, _g1.y, _g2.x, _g2.y);
        // If it doesn't intersect, skip it 
        if (_.isEqual(_sData, this.dataNode) && !Phaser.Geom.Intersects.LineToRectangle(targetLine, this.dataRect))
            return null;
        var p_min = null;
        var len_min = Number.MAX_VALUE;
        // only if it doesn't have sub tree
        if (this.dataSubTree == null) {
            if (!_.isEqual(_sData, this.dataNode))
                return null;
            var lines = [];
            lines.push(this.dataRect.getLineA());
            lines.push(this.dataRect.getLineB());
            lines.push(this.dataRect.getLineC());
            lines.push(this.dataRect.getLineD());
            for (var i = 0; i < lines.length; i++) {
                var l = lines[i];
                var tmpP = new Phaser.Geom.Point(0, 0);
                var b = Phaser.Geom.Intersects.LineToLine(targetLine, l, tmpP);
                if (b) {
                    // get min length, if it's smaller than current min, then save the point and the min value
                    var len = (tmpP.x - _g1.x) * (tmpP.x - _g1.x)
                        + (tmpP.y - _g1.y) * (tmpP.y - _g1.y);
                    if (len < len_min) {
                        len_min = len;
                        p_min = tmpP;
                    }
                }
            }
            return p_min;
        }
        else {
            for (var j = 0; j < this.dataSubTree.length; j++) {
                var st = this.dataSubTree[j];
                var tmpP = st.collisionWithMovingPoint(_g1, _g2, _sData);
                if (tmpP != null) {
                    // get min length, if it's smaller than current min, then save the point and the min value
                    var len = (tmpP.x - _g1.x) * (tmpP.x - _g1.x)
                        + (tmpP.y - _g1.y) * (tmpP.y - _g1.y);
                    if (len < len_min) {
                        len_min = len;
                        p_min = tmpP;
                    }
                }
            }
            return p_min;
        }
        // If it has sub tree for all collision points find the closest one in the sub tree.
        return null;
    };
    FkQuadTree.prototype.collisionWithQuadTree = function (_offset, _g, _sData) {
        return false;
    };
    FkQuadTree.prototype.collisionWithMovingQuadTree = function (_offset1, _offset2, _g, _sData) {
        return null;
    };
    FkQuadTree.prototype.foldSubTreesToParent = function (_data) {
        this.dataSubTree = null;
        this.dataNode = _data;
    };
    FkQuadTree.prototype.createAllSubTrees = function () {
        var wh = [
            { w: 0, h: 0 },
            { w: 1, h: 0 },
            { w: 0, h: 1 },
            { w: 1, h: 1 },
        ];
        this.dataSubTree = [];
        for (var i = 0; i < wh.length; i++) {
            var o = wh[i];
            this.dataSubTree.push(new FkQuadTree().init(this.dataRect.x + (this.dataRect.width / 2 * o.w), this.dataRect.y + (this.dataRect.height / 2 * o.h), this.dataRect.width / 2, this.dataRect.height / 2, this.resDepth - 1, this.dataNode));
        }
    };
    FkQuadTree.prototype.clearRedendantSubTrees = function () {
        var toCompare = null;
        for (var i = 0; i < this.dataSubTree.length; i++) {
            var t = this.dataSubTree[i];
            if (t.dataSubTree != null)
                return;
            if (toCompare == null)
                toCompare = t.dataNode;
            else if (!_.isEqual(toCompare, t.dataNode))
                return;
        }
        // All sub trees don't contain any sub-sub trees and have the same node data.
        this.foldSubTreesToParent(toCompare);
    };
    return FkQuadTree;
}(FkSerializable));
export { FkQuadTree };
//# sourceMappingURL=fkquadtree.js.map