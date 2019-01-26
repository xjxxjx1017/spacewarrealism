import * as Phaser from 'phaser-ce';

export class Preload extends Phaser.State {
    private ready: boolean;

    public preload(): void {
        // Load awesome fonts
        this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');

        // Load sprite
        this.game.load.image('mushroom', 'assets/sprites/mushroom.png');
        
        this.game.load.image('ship', 'assets/ship.jpg');
        this.game.load.image('space', 'assets/space.png');
        this.game.load.image('button_normal', 'assets/button/normal.png');
        this.game.load.image('button_hover', 'assets/button/hover.png');
        this.game.load.image('button_down', 'assets/button/down.png');
        this.game.load.image('overlay_ship', 'assets/buttonoverlay/ship.png');
        this.game.load.image('overlay_missle', 'assets/buttonoverlay/missle.png');
        this.game.load.image('overlay_grass', 'assets/buttonoverlay/grass.png');
        this.game.load.image('overlay_nohuman', 'assets/buttonoverlay/nohuman.png');

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    }

    public create(): void {

    }

    public update(): void {
        if ( this.ready === true ) {
            this.game.state.start('Core');
        }
    }

    private onLoadComplete(): void {
        this.ready = true;
    }
}