import * as Vue from 'vue';
import * as _ from 'lodash';
import {Ship} from '../objects/ship';
import {EventShipBrush, EBrushType} from "../events/eventshipbrush";

class PanelEditShipUI {
    public stateBrushNormal : EBrushType;
    public stateBrushErase : EBrushType;
    public statePosX : number;
    public statePosY : number;

    constructor( fields : Partial<PanelEditShipUI> ){ 
        Object.assign( this, fields ); 
    }
}

class PanelEditShipOut {
    public dataBrushType : EBrushType;
    public dataBrushSize : number;
    public brushEnabled : boolean;

    constructor( fields : Partial<PanelEditShipOut> ){ 
        Object.assign( this, fields ); 
    }
}

export class PanelEditShip {
    private dataVue : Vue;
    private dataGame : Phaser.Scene;
    private dataUnitList : Ship[];

    public get out() : PanelEditShipOut {
        return this.dataVue.out;
    }

    constructor( _game : Phaser.Scene ) {

        this.dataGame = _game;
        
        // Construct UI from Game logic loop
        this.dataVue = new Vue({
            el: '#vue-main-container',
            data: {
                out: new PanelEditShipOut({ 
                    dataBrushType : EBrushType.BRUSH_ERASE, 
                    dataBrushSize : 15,
                    brushEnabled : false,
                }),
                ui: new PanelEditShipUI({
                    stateBrushNormal: EBrushType.BRUSH_NORMAL,
                    stateBrushErase: EBrushType.BRUSH_ERASE,
                    statePosX: 15,
                    statePosY: 235,
                }),
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
        if ( !this.dataVue.out.brushEnabled )
            return;
        var evt = new EventShipBrush( p, 
            this.dataVue.out.dataBrushType,
            this.dataVue.out.dataBrushSize ); 
        EventShipBrush.Manager.notify( evt );
    }
}