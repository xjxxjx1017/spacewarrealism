import * as Phaser from 'phaser-ce';

export class Core extends Phaser.State {
    private cursors: Phaser.CursorKeys;
    private text: Phaser.BitmapText;

    public create(): void {

        this.text = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 100, 'font', 'Press Arrows / Space', 15);
        this.text.x = this.text.x - ~~(this.text.width * 0.5);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    public update(): void {
        this.game.input.update();
    }
}