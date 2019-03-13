import * as Vue from 'vue';

class EditorShipOut {
	public dataBrushType : string;
	public dataBrushSize : number;
	constructor( _brushType: string, _brushSize: number ) {
		this.dataBrushType = _brushType;
		this.dataBrushSize = _brushSize;
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
				out: new EditorShipOut( _brushErase, 15 ),
				ui: {
					dataBrushNormal: _brushNormal,
					dataBrushErase: _brushErase,
					dataRadioGroup: [{
					        label: "Paint",
					        value: _brushNormal
					    },
					    {
					        label: "Erase",
					        value: _brushErase
					    }],
					dataTabs: [{
		                    title: 'Body Paint',
		                    icon: 'person'
		                },
		                {
		                    title: 'Armor Paint',
		                    icon: 'book'
		                },
		                {
		                    title: 'Add-ons',
		                    icon: 'favorite'
		                }],
				},
			},
			method: {
			}
		});
	}
}