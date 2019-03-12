import 'phaser';

import {Preload} from './preload';
import {Core} from './core';

// UI libraries
import * as Vue from 'vue';
import KeenUI from 'keen-ui';
import '../keen-ui.css';
import "./style/main.scss";
import "./style/ui-theme.scss";

const config: GameConfig = {
	width: 1200,
	height: 600,
	type: Phaser.AUTO,
	parent: "game",
	scene: [Preload, Core],
	backgroundColor: "#000000",
	render: { pixelArt: false, antialias: true, autoResize: false }
};

Vue.use(KeenUI);

export class Main extends Phaser.Game {
    constructor() {
        super( config );
    }
}