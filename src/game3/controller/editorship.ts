import * as Vue from 'vue';

class EditorShipOut {
	public dataBrushType : string;
	constructor( _brushType: string ) {
		this.dataBrushType = _brushType;
	}
}

export class EditorShip {
	private vueData;

	public get out():EditorShipOut {
        return this.vueData.out;
    }

	constructor( _brushNormal : string, _brushErase : string ) {
		this.vueData = new Vue({
			el: '#vue-panel-editor-ship',
			data: {
				out: new EditorShipOut( _brushErase ),
				ui: {
					dataBrushNormal: _brushNormal,
					dataBrushErase: _brushErase,
				}
			},
			method: {
			}
		});
	}
}