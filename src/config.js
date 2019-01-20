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
                create: this.create,
                update: this.update
            },
            bob: null,
            graphics: null,
            offset: null,
        };
        Object.assign( this, cfg );
    }

    preload ()
    {
        this.load.image('logo', 'assets/logo.png');
    }

    create ()
    {
        var self = this;

        self.add.image(400, 300, 'logo').setAlpha(0.3);

        self.bob = self.add.image(400, 300, 'logo');

        self.graphics = self.add.graphics();

        var cropWidth = 200;
        var cropHeight = 100;

        self.bob.setCrop(0, 0, cropWidth, cropHeight);

        self.offset = self.bob.getTopLeft();

        self.input.on('pointermove', function (pointer) {

            self.bob.setCrop(
                (pointer.x - self.offset.x) - cropWidth / 2,
                (pointer.y - self.offset.y) - cropHeight / 2,
                cropWidth,
                cropHeight
            );
        });
    }

    update ()
    {
        var self = this;
        self.graphics.clear();
        self.graphics.lineStyle(1, 0x00ff00);
        self.graphics.strokeRect(
            self.offset.x + self.bob._crop.x, 
            self.offset.y + self.bob._crop.y, 
            self.bob._crop.width, 
            self.bob._crop.height);
    }
}

export { Config } 