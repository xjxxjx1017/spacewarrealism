var FkCounter = /** @class */ (function () {
    function FkCounter() {
        this.dataCount = 0;
        this.triggerAfterNum = -1;
        this.triggerAfterCallback = null;
    }
    FkCounter.prototype.AddCount = function () {
        this.dataCount++;
        this.Check();
    };
    FkCounter.prototype.ResetCount = function () {
        this.dataCount = 0;
    };
    FkCounter.prototype.InitTriggerAfter = function (_num, _f) {
        this.triggerAfterNum = _num;
        this.triggerAfterCallback = _f;
    };
    FkCounter.prototype.Check = function () {
        if (this.triggerAfterCallback != null && this.triggerAfterNum > -1) {
            if (this.dataCount >= this.triggerAfterNum) {
                var f = this.triggerAfterCallback;
                this.triggerAfterCallback = null;
                this.triggerAfterNum = -1;
                f();
            }
        }
    };
    return FkCounter;
}());
export { FkCounter };
//# sourceMappingURL=fkcounter.js.map