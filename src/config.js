import 'phaser';
import {Game1} from './game/game1.js';

class Config{

    constructor() {
        this.game = new Game1();
        var cfg = {
            type: Phaser.AUTO,
            parent: 'phaser-example',
            width: 600,
            height: 300,
            scene: {
                preload: this.game.preload,
                create: this.game.create,
                update: this.game.update
            }
        };
        Object.assign( this, cfg );
        Object.assign( this, this.game.config() );
    }
}

export { Config } 