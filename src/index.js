import 'phaser';

class Config{
    constructor() {
        var cfg = {
            type: Phaser.AUTO,
            parent: 'phaser-example',
            width: 800,
            height: 600,
            scene: {
                preload: this.preload,
                create: this.create
            }
        };
        Object.assign( this, cfg );
    }

    preload ()
    {
        this.load.image('logo', 'assets/logo.png');
    }

    create ()
    {
        var logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });

    }
}

var config = new Config();
var game = new Phaser.Game(config);

