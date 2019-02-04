import * as Phaser from 'phaser-ce';

import {FkCounter} from '../components/fkcounter';

export class Preload extends Phaser.State {

	public preload() : void {
        this.load.image('ship', 'assets/ship.jpg');
        this.load.image('ship', 'assets/ship.jpg');
        this.load.image('space', 'assets/space.png');
        this.load.image('button_normal', 'assets/button/normal.png');
        this.load.image('button_hover', 'assets/button/hover.png');
        this.load.image('button_down', 'assets/button/down.png');
        this.load.image('overlay_ship', 'assets/buttonoverlay/ship.png');
        this.load.image('overlay_missle', 'assets/buttonoverlay/missle.png');
        this.load.image('overlay_grass', 'assets/buttonoverlay/grass.png');
		this.load.image('overlay_nohuman', 'assets/buttonoverlay/nohuman.png');
	}

	public create(): void {
		var loadCount = new FkCounter();
		loadCount.InitTriggerAfter( 1, () => this.nextStage() );

        // this.game.create.grid( 'drawingGrid', 
        // 	cellR * cellCountWH.x, cellR * cellCountWH.y, 
        //         cellR, cellR, 'rgba(0,191,243,0.8)', 
        //         undefined, () => loadCount.AddCount() );
        this.nextStage();
	}

	public nextStage(): void {
		this.game.state.start('Core');
	}
}