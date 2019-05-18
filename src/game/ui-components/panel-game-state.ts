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

                    var blob = new Blob([saveString], {type: "text/plain;charset=utf-8"});
                    var url = window.URL.createObjectURL(blob);
                    var element = document.createElement('a');
                    element.setAttribute('target', '_blank');
                    element.style.display = 'none';
                    element.href = url;
                    element.download = 'save';
                    document.body.appendChild(element);
                    element.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(element);
                },
                load: function( e ) { 
                    var file = e.raw;
                    var reader = new FileReader()
                    var textFile = /text.*/;

                    if (file.type.match(textFile)) {
                        reader.onload = function (event) {
                            console.log( event.target )
                            var tmp: any = event.target;
                            self.dataGameCore.load( tmp.result );
                            self.dataVue.fileLoad = [];
                        }
                    }
                    reader.readAsText(file);
                }
            }
        });
    }
}