import * as Phaser from 'phaser-ce';

import {FkCounter} from '../components/fkCounter';

export class Preload extends Phaser.State {

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