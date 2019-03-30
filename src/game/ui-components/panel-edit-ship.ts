import * as Vue from 'vue';
import * as _ from 'lodash';
import {Ship} from '../objects/ship';
import {EventShipBrush} from "../events/eventshipbrush";

export class PanelEditShip {
    private dataVue;
    private dataGame : Phaser.Scene;
    private dataUnitList : Ship[];

    public get out() {
        return this.dataVue.out;
    }

    constructor( 
        _game : Phaser.Scene,
        _unitList : Ship[] ) {

        this.dataGame = _game;
        this.dataUnitList = _unitList;
        
        // Construct UI from Game logic loop
        this.dataVue = new Vue({
            el: '#vue-main-container',
            data: {
                out: { 
                    dataBrushType : EventShipBrush.BRUSH_ERASE, 
                    dataBrushSize : 15,
                    brushEnabled : false,
                },
                ui: {
                    stateBrushNormal: EventShipBrush.BRUSH_NORMAL,
                    stateBrushErase: EventShipBrush.BRUSH_ERASE,
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
        if ( !this.dataVue.out.brushEnabled )
            return;
        var evt = new EventShipBrush( 
            EventShipBrush.EVENT_DRAW, p, 
            this.dataVue.out.dataBrushType,
            this.dataVue.out.dataBrushSize ); 
        _.forEach( this.dataUnitList, function(unit : Ship) {
            unit.eventAction( evt );
        })
    }
}

Vue.component('panel-edit-ship', {
	props: {
		posX: Number,
		posY: Number,
        brushEnabled: Boolean, 
		brushSize: Number,	
		brushType: String,
		brushNormal: String,
		brushErase: String,
	},
	data: function () {
        var TAB_BODY_PAINT = "Body Paint";
        var TAB_ADD_ON = "Add-ons";
		return {
            TAB_BODY_PAINT: TAB_BODY_PAINT,
            TAB_ADD_ON: TAB_ADD_ON,
            TAB_DEFAULT: TAB_BODY_PAINT,
			ui: {
				dataEditPanelVsb: false,
				dataRadioGroup: [
					{ title: "Paint", value: this.brushNormal },
				    { title: "Erase", value: this.brushErase }
				],
                dataRadioGroup2: [
                    { title: "Turret", value: this.brushNormal },
                ],
				dataTabs: [
					{ title: TAB_BODY_PAINT },
	                { title: 'Armor Paint' },
	                { title: TAB_ADD_ON }
	            ],
			},
		}
	},
    methods: {
        tabChange: function ( label ) {
            switch( label ) {
                case this.TAB_BODY_PAINT:
                    this.$emit('update:brushEnabled', true );
                    break;
                default:
                    this.$emit('update:brushEnabled', false );
                    break;
            }
        },
    },
    watch: {
        'ui.dataEditPanelVsb' : function( vNew, vOld ) {
            if ( vNew )
                this.tabChange( this.TAB_DEFAULT );
            else
                this.tabChange( null );
        }
    },
	template: `
<div class="panel-edit-ship" :style="{ top: posY + 'px', left: posX + 'px' }">
    <el-button v-show="!ui.dataEditPanelVsb" @click="ui.dataEditPanelVsb = true" 
        icon="el-icon-edit" type="primary" circle>
    </el-button>
    <el-dialog
      title="Edit Ship" :modal="false" :modal-append-to-body="false"
      :visible.sync="ui.dataEditPanelVsb" :close-on-click-modal="false"
      center>
        <div id="vue-panel-editor-ship">
            <div class="brush-panel fk-inverse-tabs fk-dark-tabs">
                <el-tabs tab-position="bottom" type="border-card" @tab-click="tabChange($event.label)">
                    <el-tab-pane :label="tab.title" v-for="tab in ui.dataTabs" :key="tab.title">
                        <div class="fk-row">
                            <h2 class="fk-row no-user-select">{{ tab.title }}</h2>
                        </div>
                        <div class="fk-row"></div>
                        <div class="fk-tab-content" v-if="tab.title == TAB_BODY_PAINT">
                            <div class="fk-row">
                                <el-slider 
                                    :min="1" :max="30"
                                    :value="brushSize" 
                                    @input="$emit('update:brushSize', $event)">
                                </el-slider>
                            </div>
                            <div class="fk-row"></div>
                            <div class="fk-row">
                                <el-radio-group
                                    name="brushType"
                                    vertical
                                    :options="ui.dataRadioGroup"
                                    :value="brushType" 
                                    @input="$emit('update:brushType', $event)">
                                    <el-radio v-for="rb in ui.dataRadioGroup" :key="rb.title" :label="rb.value">{{rb.title}}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="fk-tab-content" v-if="tab.title == TAB_ADD_ON">
                            <div class="fk-row">
                                <el-radio-group
                                    name="brushType"
                                    vertical
                                    :options="ui.dataRadioGroup2"
                                    :value="brushType" 
                                    @input="$emit('update:brushType', $event)">
                                    <el-radio v-for="rb in ui.dataRadioGroup2" :key="rb.title" :label="rb.value">{{rb.title}}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="ui.dataEditPanelVsb = false">Cancel</el-button>
            <el-button type="primary" @click="ui.dataEditPanelVsb = false">Save</el-button>
        </span>
    </el-dialog>
</div>
	`
})