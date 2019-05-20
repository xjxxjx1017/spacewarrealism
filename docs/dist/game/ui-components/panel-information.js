import * as Vue from 'vue';
var PanelInformation = /** @class */ (function () {
    function PanelInformation(_game, _uiGroup) {
        this.dataGame = _game;
        // Construct UI from Game logic loop
        this.dataVue = new Vue({
            el: '#vue-top-container',
            data: {
                uiGroup: _uiGroup
            }
        });
    }
    return PanelInformation;
}());
export { PanelInformation };
//# sourceMappingURL=panel-information.js.map