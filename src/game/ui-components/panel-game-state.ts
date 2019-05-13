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
                fileLoad: []
            },
            methods: {
                battle: function() { self.dataGameCore.changeStateToBattle(); },
                reset: function() { self.dataGameCore.reset(); },
                save: function() { 
                    var saveString = self.dataGameCore.save(); 

                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( saveString ));
                    element.setAttribute('target', '_blank');
                    element.setAttribute('download', "save");
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                },
                load: function( e ) { 
                    var file = window.URL.createObjectURL( e );
                    self.dataGameCore.load( file );
                }
            }
        });
    }
}