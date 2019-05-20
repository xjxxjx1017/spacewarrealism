import * as Vue from 'vue';
var PanelGameState = /** @class */ (function () {
    function PanelGameState(_gameCore) {
        var self = this;
        this.dataGameCore = _gameCore;
        // Construct UI from Game logic loop
        this.dataVue = new Vue({
            el: '#vue-game-state-container',
            data: {},
            methods: {
                battle: function () { self.dataGameCore.changeStateToBattle(); },
                reset: function () { self.dataGameCore.reset(); },
                save: function () { self.dataGameCore.save(); },
                load: function () { self.dataGameCore.load(); }
            }
        });
    }
    return PanelGameState;
}());
export { PanelGameState };
//# sourceMappingURL=panel-game-state.js.map