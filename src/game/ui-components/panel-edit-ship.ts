import * as Vue from 'vue';
import * as _ from 'lodash';
import {Ship} from '../objects/ship';
import {EventShipBrush, EBrushType} from "../events/eventshipbrush";
import {EventStampType, EStampType} from "../events/eventplacestamp";

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
        })
        this.dataGame.input.on( "pointermove", function( _p ) {
            if ( self.dataGame.input.mousePointer.isDown ) {
                self.eventDraw( _p );
            }
        })
    }

    private eventDraw( p ) {
        if ( !this.dataVue.out.dataBrushEnabled )
            return;
        var evt = new EventShipBrush( p, 
            this.dataVue.out.dataBrushType,
            this.dataVue.out.dataBrushSize ); 
        EventShipBrush.Manager.notify( evt );
    }
}