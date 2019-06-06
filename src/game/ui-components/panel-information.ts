import {Lodash as _, Vue} from "../importall";

export interface PanelInformationUnit {
    stateHp: number,
    statePosX: number,
    statePosY: number,
    stateWidth: number,
    stateHeight: number,
}

export class PanelInformation {
    public dataVue : Vue;
    private dataGame : Phaser.Scene;

    constructor( _game : Phaser.Scene, _uiGroup : PanelInformationUnit[] ) {
        this.dataGame = _game;
        
        // Construct UI from Game logic loop
        this.dataVue = new Vue({
            el: '#vue-top-container',
            data: {
                uiGroup: _uiGroup
            }
        });
    }
}