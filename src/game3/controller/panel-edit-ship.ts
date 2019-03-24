import * as Vue from 'vue';

export class PanelEditShip {
	private vueData;

	public get out() {
        return this.vueData.out;
    }
    // Construct UI from Game logic loop
	constructor( 
		_posX : number, _posY : number, 
		_brushNormal : string, _brushErase : string ) {
		
		this.vueData = new Vue({
			el: '#vue-main-container',
			data: {
				out: { 
					dataBrushType : _brushErase, 
					dataBrushSize : 15
				},
				ui: {
					stateBrushNormal: _brushNormal,
					stateBrushErase: _brushErase,
					statePosX: _posX,
					statePosY: _posY,
				},
			}
		});
	}
}