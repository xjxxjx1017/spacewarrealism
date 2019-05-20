import { FkFactory } from './FkFactory';
var FkSerializable = /** @class */ (function () {
    function FkSerializable(_classType, _keyList, _killKeyList) {
        this.dataKeyList = [];
        this.dataKillKeyList = [];
        this.dataKeyList = _keyList;
        this.dataKillKeyList = _killKeyList;
        this.dataClassType = _classType;
    }
    FkSerializable.prototype.kill = function () {
        if (this.dataKillKeyList == null)
            return;
        for (var i = 0; i < this.dataKillKeyList.length; i++) {
            var k = this.dataKillKeyList[i];
            if (this[k]) {
                if (Array.isArray(this[k])) {
                    for (var i = 0; i < this[k].length; i++) {
                        var item = this[k][i];
                        if (item.kill == null) {
                            alert("Kill function not found on: " + this.dataClassType + "." + k);
                        }
                        item.kill();
                        this[k][i] = null;
                    }
                    this[k] = null;
                }
                else {
                    if (this[k].kill == null) {
                        alert("Kill function not found on: " + this.dataClassType + "." + k);
                    }
                    this[k].kill();
                    this[k] = null;
                }
            }
        }
    };
    FkSerializable.prototype.serialize = function () {
        return FkSerialize.serialize(this, this.dataKeyList);
    };
    FkSerializable.prototype.unserialize = function (s) {
        FkSerialize.unserialize(this, s, this.dataKeyList);
        this.afterUnserializeInit();
    };
    return FkSerializable;
}());
export { FkSerializable };
var FkSerialize = /** @class */ (function () {
    function FkSerialize() {
    }
    FkSerialize.serialize = function (src, keyList) {
        var saveObj = {};
        for (var i = 0; i < keyList.length; i++) {
            var k = keyList[i];
            var v = src[k];
            var toSave = FkSerialize.serializeWithType(v);
            saveObj[k] = toSave;
        }
        return JSON.stringify(saveObj);
    };
    FkSerialize.unserialize = function (target, s, keyList) {
        var src = JSON.parse(s);
        target.kill();
        for (var i = 0; i < keyList.length; i++) {
            var k = keyList[i];
            if (src[k] == null)
                continue;
            if (Array.isArray(src[k])) {
                target[k] = [];
                for (var j = 0; j < src[k].length; j++) {
                    var tmp = FkFactory.factory(src[k][j].CLASS_TYPE, src[k][j]);
                    target[k].push(tmp);
                }
            }
            else
                target[k] = FkFactory.factory(src[k].CLASS_TYPE, src[k]);
        }
    };
    FkSerialize.serializeWithType = function (obj) {
        if (obj == null)
            return null;
        // In case of Array
        if (Array.isArray(obj)) {
            var rltArr = [];
            for (var i = 0; i < obj.length; i++) {
                rltArr.push(this.serializeWithType(obj[i]));
            }
            return rltArr;
        }
        var rlt = {};
        var className = obj.constructor.name;
        switch (className) {
            case "Boolean":
                rlt.boolean = obj;
                break;
            case "Number":
                rlt.num = obj;
                break;
            case "Rectangle":
                rlt.x = obj.x;
                rlt.y = obj.y;
                rlt.width = obj.width;
                rlt.height = obj.height;
                break;
            case "Point":
                rlt.x = obj.x;
                rlt.y = obj.y;
                break;
            default:
                if (FkSerialize.registeredClass[className] != null) {
                    rlt = JSON.parse(obj.serialize());
                    break;
                }
                alert("Class not defined in serializeWithType: " + className);
                break;
        }
        rlt.CLASS_TYPE = className;
        return rlt;
    };
    FkSerialize.registeredClass = new Map();
    return FkSerialize;
}());
//# sourceMappingURL=fkserializable.js.map