import * as Vue from 'vue';
import * as _ from 'lodash';

Vue.component('panel-information', {
	props: {
        hp: Number,
        posX: Number,
        posY: Number,
        width: Number,
        height: Number,
	},
	template: `
<div class="panel-information" :style="{ top: posY + 'px', left: posX + 'px', width: width + 'px' }">
    <el-progress :text-inside="true" :stroke-width="height" :percentage="hp"></el-progress>
</div>
	`
})