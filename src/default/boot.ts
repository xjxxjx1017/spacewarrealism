
import * as Phaser from 'phaser-ce';

export class Boot extends Phaser.State {
    public create(): void {
        this.game.stage.backgroundColor = '000000';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();

        this.game.state.start('Preload');
    }
}