import 'phaser';
import {FkGameData} from './service/fkgamedata';

export class Core extends Phaser.Scene {

    constructor() {
        super({
            key: "Core"
        });
    }
    
	public create(): void {
		var g = this;
		
		FkGameData.inst().init( g );
		FkGameData.inst().run();
	}

	// public update(): void {
	// 	FkGameData.inst().Update();
	// }
}