import { FkDestructibleObject, FkDstrGridData } from './destructibleobject';
import { FkQuadTree } from './fkquadtree';
import { Ship } from "../game/objects/ship";
import { Gun } from "../game/objects/gun";
var FkFactory = /** @class */ (function () {
    function FkFactory() {
    }
    FkFactory.registClasses = function () {
        FkFactory.registeredClass = new Map();
        FkFactory.registeredClass["FkQuadTree"] = FkQuadTree;
        FkFactory.registeredClass["FkDstrGridData"] = FkDstrGridData;
        FkFactory.registeredClass["FkDestructibleObject"] = FkDestructibleObject;
        FkFactory.registeredClass["Ship"] = Ship;
        FkFactory.registeredClass["Gun"] = Gun;
    };
    FkFactory.factory = function (className, param) {
        if (FkFactory.registeredClass == null)
            FkFactory.registClasses();
        switch (className) {
            case "Boolean": return param.boolean == true;
            case "Number": return parseInt(param.num);
            case "Rectangle": return new Phaser.Geom.Rectangle(param.x, param.y, param.width, param.height);
            case "Point": return new Phaser.Geom.Point(param.x, param.y);
            default:
                if (FkFactory.registeredClass[className] != null) {
                    var tmp = new FkFactory.registeredClass[className]();
                    tmp.unserialize(JSON.stringify(param));
                    return tmp;
                }
                alert("Class not defined in factory: " + className);
                return null;
        }
    };
    FkFactory.registeredClass = null;
    return FkFactory;
}());
export { FkFactory };
//# sourceMappingURL=FkFactory.js.map