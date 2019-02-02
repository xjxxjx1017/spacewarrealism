
export class FkGameData {
	private game;
	private canvas;
	private canvasSprite;

	private static _inst:FkGameData = null;
	public static inst():FkGameData {
		if ( this._inst == null )
			this._inst = new FkGameData();
		return this._inst;
	}

	private constructor() {}

	public Init( game ) {
		return this.game = game;
	}

	public Run() {
		var game = this.game;
        var cellCountWH = new Phaser.Point( 32, 16 );
        //  Dimensions
        var spriteWidth = 8;
        var spriteHeight = 8;

        var canvas = game.make.bitmapData(spriteWidth * cellCountWH.x, spriteHeight * cellCountWH.y);
        canvas.rect(0, 0, canvas.width, canvas.height, '#3f5c67');
        var x = 10;
        var y = 10;
        var canvasSprite = canvas.addToWorld(x, y);

        function paint(pointer) {
	    }
	}
}