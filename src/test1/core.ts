import 'phaser';

export class Core extends Phaser.Scene {
    private text: Phaser.GameObjects.BitmapText;

    constructor() {
        super({
            key: "Core"
        });
    }
    
    public create(): void {
        this.text = this.add.bitmapText( 200, 200, 'font', 'Press Arrows / Space', 15);
        this.text.x = this.text.x - ~~(this.text.width * 0.5);
    }
}