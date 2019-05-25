import 'phaser';
import {GameData} from './objects/gamedata';

export class Core extends Phaser.Scene {

	private dataGame : GameData;

    constructor() {
        super({
            key: "Core"
        });
    }
    
	public create(): void {
		this.dataGame = new GameData( this );
		this.dataGame.run();
	}

	public update(time: number, delta: number): void{
		this.dataGame.update(time, delta);
	}
}