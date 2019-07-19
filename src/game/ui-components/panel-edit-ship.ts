import {Lodash as _, Vue, EventShipBrush, EBrushType, EventStampType, EStampType, EventWithMouse, Ship} from "../importall";

export class PanelEditShip {
    private dataVue : Vue;
    private dataGame : Phaser.Scene;

    public get out() : any {
        return this.dataVue.out;
    }

    constructor( _game : Phaser.Scene ) {
        this.dataGame = _game;
        
        // Construct UI from Game logic loop
        this.dataVue = new Vue({
            el: '#vue-main-container',
            data: {
                out: { 
                    dataBrushEnabled : false,
                    dataBrushType : EBrushType.BRUSH_ERASE, 
                    dataBrushSize : 15,
                    dataStampEnabled : false,
                    dataStampType : EStampType.STAMP_TURRET_RED,
                },
                ui: {
                    statePosX: 15,
                    statePosY: 235,
                },
            }
        });
        this.initEvents();
    }
        
    private initEvents() {
        var self = this;
        this.dataGame.input.on( "pointerdown", function( _p ) {
            self.eventDraw( _p );
            self.eventStamp( _p );
        }, this)
        this.dataGame.input.on( "pointermove", function( _p ) {
            if ( self.dataGame.input.mousePointer.isDown ) {
                self.eventDraw( _p );
            }
        }, this)
    }

    private eventDraw( p ) {
        if ( !this.dataVue.out.dataBrushEnabled )
            return;
        var evt = new EventShipBrush( p, 
            this.dataVue.out.dataBrushType,
            this.dataVue.out.dataBrushSize ); 
        EventShipBrush.Manager.notify( evt );
    }

    private eventStamp( p ) {
        if ( !this.dataVue.out.dataStampEnabled )
            return;
        var evt = new EventStampType( p, 
            this.dataVue.out.dataStampType ); 
        EventStampType.Manager.notify( evt );
    }
}