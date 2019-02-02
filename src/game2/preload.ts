import * as Phaser from 'phaser-ce';

export class Preload extends Phaser.State {
    private ready: boolean;
    private countLoaded: number = 0;
    private RES_TO_LOAD: number = 3;

    public preload(): void {}

    public create(): void {
        var self = this;

        this.game.create.grid('uiGrid', 32 * 16, 32, 32, 32, 'rgba(255,255,255,0.5)', undefined, 
            ()=> { self.countLoaded++; });

        var canvasZoom:number = 32;
        this.game.create.grid('drawingGrid', 16 * canvasZoom, 16 * canvasZoom, 
                canvasZoom, canvasZoom, 'rgba(0,191,243,0.8)', undefined, ()=> { self.countLoaded++; });
        
        var arrow = [
            '  22  ',
            ' 2222 ',
            '222222',
            '  22  ',
            '  22  '
        ];
        this.game.create.texture('arrow', arrow, 2, undefined, undefined, undefined, 
            ()=> { self.countLoaded++; });
    }

    public update(): void {
        if ( this.countLoaded >= this.RES_TO_LOAD ) {
            this.game.state.start('Core');
        }
    }
}