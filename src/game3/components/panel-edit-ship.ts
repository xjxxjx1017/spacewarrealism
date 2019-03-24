import * as Vue from 'vue';

Vue.component('panel-edit-ship', {
	props: {
		posX: Number,
		posY: Number,
		brushSize: Number,	
		brushType: String,
		brushNormal: String,
		brushErase: String,
	},
	data: function () {
		return {
			ui: {
				dataEditPanelVsb: false,
				dataRadioGroup: [
					{ title: "Paint", value: this.brushNormal },
				    { title: "Erase", value: this.brushErase }
				],
				dataTabs: [
					{ title: 'Body Paint' },
	                { title: 'Armor Paint' },
	                { title: 'Add-ons' }
	            ],
			},
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
                <el-tabs tab-position="bottom" type="border-card">
                    <el-tab-pane :label="tab.title" v-for="tab in ui.dataTabs" :key="tab.title">
                        <div class="fk-row">
                            <h2 class="fk-row no-user-select">{{ tab.title }}</h2>
                        </div>
                        <div class="fk-row"></div>
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