import * as Vue from 'vue';
import { EBrushType } from "../events/eventshipbrush";
import { EStampType } from "../events/eventplacestamp";
import { EventWithMouse } from "../events/eventwithmouse";
Vue.component('panel-edit-ship', {
    props: {
        brushEnabled: Boolean,
        brushSize: Number,
        brushType: EBrushType,
        stampEnabled: Boolean,
        stampType: EStampType,
        posX: Number,
        posY: Number,
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
                    { title: "Paint", value: EBrushType.BRUSH_NORMAL },
                    { title: "Erase", value: EBrushType.BRUSH_ERASE }
                ],
                dataRadioGroup2: [
                    { title: "Turret", value: EStampType.STAMP_TURRET_RED },
                    { title: "Shield", value: EStampType.STAMP_SHIELD },
                ],
                dataTabs: [
                    { title: TAB_BODY_PAINT },
                    { title: 'Armor Paint' },
                    { title: TAB_ADD_ON }
                ],
            },
        };
    },
    methods: {
        onTabChange: function (label) {
            switch (label) {
                case this.TAB_BODY_PAINT:
                    this.$emit('update:brushEnabled', true);
                    this.$emit('update:stampEnabled', false);
                    break;
                case this.TAB_ADD_ON:
                    this.$emit('update:brushEnabled', false);
                    this.$emit('update:stampEnabled', true);
                    break;
                default:
                    this.$emit('update:brushEnabled', false);
                    this.$emit('update:stampEnabled', false);
                    break;
            }
            this.updateTool();
        },
        onToolChange: function (propName, value) {
            this.$emit(propName, value);
            this.updateTool();
        },
        updateTool: function () {
            var self = this;
            Vue.nextTick(function () {
                if (self.stampEnabled && self.stampType == EStampType.STAMP_TURRET_RED) {
                    EventWithMouse.Manager.notify(new EventWithMouse(EventWithMouse.IMAGE_RED_TURRET));
                }
                else {
                    EventWithMouse.Manager.notify(new EventWithMouse(null));
                }
            });
        },
    },
    watch: {
        'ui.dataEditPanelVsb': function (vNew, vOld) {
            if (vNew)
                this.onTabChange(this.TAB_DEFAULT);
            else
                this.onTabChange(null);
        }
    },
    template: "\n<div class=\"panel-edit-ship\" :style=\"{ top: posY + 'px', left: posX + 'px' }\">\n    <el-button v-show=\"!ui.dataEditPanelVsb\" @click=\"ui.dataEditPanelVsb = true\" \n        icon=\"el-icon-edit\" type=\"primary\" circle>\n    </el-button>\n    <el-dialog\n      title=\"Edit Ship\" :modal=\"false\" :modal-append-to-body=\"false\"\n      :visible.sync=\"ui.dataEditPanelVsb\" :close-on-click-modal=\"false\"\n      center>\n        <div id=\"vue-panel-editor-ship\">\n            <div class=\"brush-panel fk-inverse-tabs fk-dark-tabs\">\n                <el-tabs tab-position=\"bottom\" type=\"border-card\" @tab-click=\"onTabChange($event.label)\">\n                    <el-tab-pane :label=\"tab.title\" v-for=\"tab in ui.dataTabs\" :key=\"tab.title\">\n                        <div class=\"fk-row\">\n                            <h2 class=\"fk-row no-user-select\">{{ tab.title }}</h2>\n                        </div>\n                        <div class=\"fk-row\"></div>\n                        <div class=\"fk-tab-content\" v-if=\"tab.title == TAB_BODY_PAINT\">\n                            <div class=\"fk-row\">\n                                <el-slider \n                                    :min=\"1\" :max=\"30\"\n                                    :value=\"brushSize\" \n                                    @input=\"$emit('update:brushSize', $event)\">\n                                </el-slider>\n                            </div>\n                            <div class=\"fk-row\"></div>\n                            <div class=\"fk-row\">\n                                <el-radio-group\n                                    name=\"brushType\"\n                                    vertical\n                                    :options=\"ui.dataRadioGroup\"\n                                    :value=\"brushType\" \n                                    @input=\"$emit('update:brushType', $event)\">\n                                    <el-radio v-for=\"rb in ui.dataRadioGroup\" :key=\"rb.title\" :label=\"rb.value\">{{rb.title}}</el-radio>\n                                </el-radio-group>\n                            </div>\n                        </div>\n                        <div class=\"fk-tab-content\" v-if=\"tab.title == TAB_ADD_ON\">\n                            <div class=\"fk-row\">\n                                <el-radio-group\n                                    name=\"stampType\"\n                                    vertical\n                                    :options=\"ui.dataRadioGroup2\"\n                                    :value=\"stampType\" \n                                    @input=\"onToolChange('update:stampType', $event)\">\n                                    <el-radio v-for=\"rb in ui.dataRadioGroup2\" :key=\"rb.title\" :label=\"rb.value\">{{rb.title}}</el-radio>\n                                </el-radio-group>\n                            </div>\n                        </div>\n                    </el-tab-pane>\n                </el-tabs>\n            </div>\n        </div>\n        <span slot=\"footer\" class=\"dialog-footer\">\n            <el-button @click=\"ui.dataEditPanelVsb = false\">Cancel</el-button>\n            <el-button type=\"primary\" @click=\"ui.dataEditPanelVsb = false\">Save</el-button>\n        </span>\n    </el-dialog>\n</div>\n\t"
});
//# sourceMappingURL=panel-edit-ship-vue.js.map