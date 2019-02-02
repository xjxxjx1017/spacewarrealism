import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';

import {Config} from '../default/config';
import {Boot} from '../default/boot';

import {Preload} from './preload';
import {Core} from './core';


export class Main extends Phaser.Game {

    constructor() {
        super(Config.gameWidth, Config.gameHeight, Phaser.CANVAS, 'content', null);

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('Core', Core, false);

        this.state.start('Boot');
    }
}