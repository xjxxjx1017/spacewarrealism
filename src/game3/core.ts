import * as Phaser from 'phaser-ce';
import {FkGameData} from './service/fkgamedata';

export class Core extends Phaser.State {
	public create(): void {
		var game = this.game;
		FkGameData.inst().Init( this.game );
		FkGameData.inst().Run();
	}
}