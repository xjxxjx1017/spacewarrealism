import 'phaser';

export class Preload extends Phaser.Scene {
    private ready: boolean;

    constructor() {
        super({
            key: "Preload"
        });
    }

    public preload(): void {
        // Load awesome fonts
        this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');

        // Load sprite
        this.load.image('mushroom', 'assets/sprites/mushroom.png');
        
        this.load.image('ship', 'assets/ship.jpg');
        this.load.image('space', 'assets/space.png');
        this.load.image('button_normal', 'assets/button/normal.png');
        this.load.image('button_hover', 'assets/button/hover.png');
        this.load.image('button_down', 'assets/button/down.png');
        this.load.image('overlay_ship', 'assets/buttonoverlay/ship.png');
        this.load.image('overlay_missle', 'assets/buttonoverlay/missle.png');
        this.load.image('overlay_grass', 'assets/buttonoverlay/grass.png');
        this.load.image('overlay_nohuman', 'assets/buttonoverlay/nohuman.png');

        this.load.on( 'complete', () => { this.onLoadComplete(); } );
    }

    public create(): void {
    }

    public update(): void {
        if ( this.ready === true ) {
            this.scene.start('Core');
        }
    }

    private onLoadComplete(): void {
        this.ready = true;
    }
}