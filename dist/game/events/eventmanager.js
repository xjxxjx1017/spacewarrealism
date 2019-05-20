var EventManager = /** @class */ (function () {
    function EventManager() {
        this.observerList = new Map();
    }
    EventManager.prototype.attach = function (_id, _eventFunc) {
        this.observerList.set(_id, _eventFunc);
    };
    EventManager.prototype.detach = function (_id) {
        delete this.observerList[_id];
    };
    EventManager.prototype.notify = function (_evt) {
        this.observerList.forEach(function (value, key, map) {
            if (value != null)
                value(key, _evt);
        });
    };
    return EventManager;
}());
export { EventManager };
//# sourceMappingURL=eventmanager.js.map