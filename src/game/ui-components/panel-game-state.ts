import * as Vue from 'vue';
import * as _ from 'lodash';
import {GameData} from '../objects/gamedata';

export class PanelGameState {
    public dataVue : Vue;
    private dataGameCore : GameData;

    constructor( _gameCore : GameData ) {
        var self = this;
        this.dataGameCore = _gameCore;
        
        // Construct UI from Game logic loop
        this.dataVue = new Vue({
            el: '#vue-game-state-container',
            data: {
            },
            methods: {
                battle: function() { self.dataGameCore.changeStateToBattle(); },
                reset: function() { self.dataGameCore.reset(); }
            }
        });
    }
}