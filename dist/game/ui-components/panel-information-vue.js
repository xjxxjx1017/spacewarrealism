import * as Vue from 'vue';
Vue.component('panel-information', {
    props: {
        hp: Number,
        posX: Number,
        posY: Number,
        width: Number,
        height: Number,
    },
    template: "\n<div class=\"panel-information\" :style=\"{ top: posY + 'px', left: posX + 'px', width: width + 'px' }\">\n    <el-progress :text-inside=\"true\" :stroke-width=\"height\" :percentage=\"hp\"></el-progress>\n</div>\n\t"
});
//# sourceMappingURL=panel-information-vue.js.map