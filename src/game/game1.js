import 'phaser';
import { ResourceLoader } from './../resourceloader.js';

class Game1{
	constructor() {}

	config() {
        return {};
	}

    preload ()
    {
        ResourceLoader.load( this );
    }

    create ()
    {
        var self = this;

        // graphics
        self.graphics = self.add.graphics();

        // pointer
        self.pointer = new Phaser.Geom.Point(),
        self.input.on('pointermove', function (pointer) {
            self.pointer.x = pointer.x;
            self.pointer.y = pointer.y;
        });

        // bg
        self.add.image(300, 300, 'logo').setAlpha(0.3);

        // bob
        self.bob = self.add.image(300, 300, 'logo').setOrigin(0, 0);

        var cropWidth = 50;
        var cropHeight = 50;
        var startOffset = new Phaser.Geom.Point( 0, 0 );

        self.offset = self.bob.getTopLeft();

        self.bob.setCrop(
            startOffset.x,
            startOffset.y,
            cropWidth,
            cropHeight
        );

        self.input.on('pointermove', function (pointer) {
            self.bob.x = pointer.x;
            self.bob.y = pointer.y;
        });
    }

    update ()
    {
        var self = this;
        self.graphics.clear();
        self.graphics.lineStyle(1, 0x00ff00);
        self.graphics.strokeRect(
            self.pointer.x, 
            self.pointer.y, 
            self.bob._crop.width, 
            self.bob._crop.height);
    }
}

export {Game1};

