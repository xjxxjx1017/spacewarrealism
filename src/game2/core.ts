import 'phaser';

export class Core extends Phaser.Scene {
    private text: Phaser.GameObjects.BitmapText;

    constructor() {
        super({
            key: "Core"
        });
    }
    
    public create(): void {
        var rt = this.add.renderTexture(0, 0, 400, 300);
        var mushroom = this.add.image(200, 100, 'mushroom').setVisible(false);
        rt.draw(mushroom);

        mushroom.setX( 210 );
        mushroom.setY( 210 );

        rt.draw(mushroom);

        rt.setX( 30 );
        rt.setY( 30 );

        // console.log( rt.textureManager.getPixel( 220, 220 ) );
    }
}