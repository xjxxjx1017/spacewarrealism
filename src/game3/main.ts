import 'phaser';

import {Preload} from './preload';
import {Core} from './core';

// UI libraries
import * as Vue from 'vue';
import 'element-ui';
import 'element_ui_css';
declare var ElementUI : any;
// import other components
import './components/panel-edit-ship';
import "./style/main.scss";
import "./style/ui-theme.scss";
import "./style/panel-edit-ship.scss";

const config: GameConfig = {
	width: 1200,
	height: 600,
	type: Phaser.AUTO,
	parent: "game",
	scene: [Preload, Core],
	backgroundColor: "#cccccc",
	render: { pixelArt: false, antialias: true, autoResize: false }
};

Vue.use(ElementUI);

export class Main extends Phaser.Game {
    constructor() {
        super( config );
    }
}