import * as Vue from 'vue';

Vue.component('test-tag', {
	data: function () {
		return {
			count: 0
		}
	},
	template: `
	<button v-on:click="count++">
		You clicked me {{ count }} times.
	</button>
	`
})