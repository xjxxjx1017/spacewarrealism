import 'phaser';

import {Preload} from './preload';
import {Core} from './core';

// UI libraries
import * as Vue from 'vue';
import 'element-ui';
import 'element_ui_css';
declare var ElementUI : any;
// import other components
import './ui-components/panel-edit-ship';
import "./ui-style/main.scss";
import "./ui-style/ui-theme.scss";
import "./ui-style/panel-edit-ship.scss";
import "./ui-style/panel-information.scss";
import "./ui-style/panel-game-state.scss";
import "./ui-style/panel-game-state.scss";

const config: GameConfig = {
	width: 800,
	height: 400,
	type: Phaser.AUTO,
	parent: "game",
	scene: [Preload, Core],
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            },
        }
    },
	backgroundColor: "#cccccc",
	render: { pixelArt: false, antialias: true, autoResize: false }
};

Vue.use(ElementUI);

export class Main extends Phaser.Game {
    constructor() {
        super( config );
    }
}