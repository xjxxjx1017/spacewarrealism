import * as Phaser from 'phaser-ce';
import {FkGameData} from './service/fkGameData';

export class Core extends Phaser.State {
	public create(): void {
		var game = this.game;
		FkGameData.inst().Init( this );
		FkGameData.inst().Run();
	}
}