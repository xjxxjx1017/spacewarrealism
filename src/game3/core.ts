import * as Phaser from 'phaser-ce';
import {FkGameData} from './service/fkgamedata';

export class Core extends Phaser.State {
	public create(): void {
		var g = this.game;
		FkGameData.inst().Init( g );
		FkGameData.inst().Run();
	}

	public update(): void {
		FkGameData.inst().Update();
	}
}