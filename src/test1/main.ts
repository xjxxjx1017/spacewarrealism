import 'phaser';

import {Preload} from './preload';
import {Core} from './core';

const config: Phaser.Types.Core.GameConfig = {
	width: 1200,
	height: 600,
	type: Phaser.AUTO,
	parent: "game",
	scene: [Preload, Core],
	backgroundColor: "#000000",
	render: { pixelArt: false, antialias: true }
};

export class Main extends Phaser.Game {
    constructor() {
        super( config );
    }
}