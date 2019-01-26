import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';

import {Config} from './config';

import {Boot} from './states/boot';
import {Preload} from './states/preload';
import {Game1} from './games/game1';

class Template extends Phaser.Game {

    constructor() {
        super(Config.gameWidth, Config.gameHeight, Phaser.CANVAS, 'content', null);

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('Game', Game1, false);

        this.state.start('Boot');
    }
}

window.onload = () => {
    new Template();
};