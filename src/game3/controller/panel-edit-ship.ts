import * as Vue from 'vue';
import * as _ from 'lodash';
import {FkShip, FkEventShipBrush} from '../service/fkship';

export class PanelEditShip {
	private dataVue;
	private dataGame : Phaser.Scene;
	private dataUnitList : FkShip[];

	public get out() {
        return this.dataVue.out;
    }

	constructor( 
		_game : Phaser.Scene,
		_unitList : FkShip[],
		_brushNormal : string, _brushErase : string ) {

		this.dataGame = _game;
		this.dataUnitList = _unitList;
		
    	// Construct UI from Game logic loop
		this.dataVue = new Vue({
			el: '#vue-main-container',
			data: {
				out: { 
					dataBrushType : _brushErase, 
					dataBrushSize : 15
				},
				ui: {
					stateBrushNormal: _brushNormal,
					stateBrushErase: _brushErase,
					statePosX: 15,// _unitList[0].dataRect.x,
					statePosY: 235,// _unitList[0].dataRect.y,
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
    	var evt = new FkEventShipBrush( 
    		FkShip.EVENT_DRAW, p, 
    		this.dataVue.out.dataBrushType,
    		this.dataVue.out.dataBrushSize ); 
    	_.forEach( this.dataUnitList, function(unit : FkShip) {
    		unit.eventAction( evt );
    	})
    }
}