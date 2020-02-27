/**
 *
 * 模态窗Service
 *
 */

import Vue from 'vue/dist/vue.esm.js'
import modalComp from '../../components/modal/modal.vue'
export default {
	/**
	 * 错误弹出层
	 * @param  {String} msg 错误文字
	 * @return null
	 */
	show: function(option) {
		let options = Object.assign({
				popClass: option.popClass,
				btnCount: 1,
				title: '',
				confirmBtn: '确定',
				cancelBtn: '好的',
				confirm: null,
				cancel: null,
				content: '这里是内容',
				closePop: false
			},
			option || {}
		);
		console.log(options.closePop);

		var el =
			document.getElementById('j-modal') || document.createElement('div');
		el.id = 'j-modal';
		el.innerHTML =
			`<modal-comp :title="title" :close-pop='closePop' :pop-class="popClass" :confirm-btn="confirmBtn" :cancel-btn="cancelBtn" :confirm="confirm" :cancel="cancel" :btn-count="btnCount" ref="child">${option.content}</modal-comp>`;
		document.getElementsByTagName('body')[0].appendChild(el);

		return new Vue({
			el: '#j-modal',
			data: {
				...options,
				...options.data
			},
			components: {
				modalComp
			},
			mounted() {},
			created() {},
			methods: {
				...options.methods,
				hide: function() {
					this.$refs.child.hideModal();
				},

				confirmDisable: function() {
					this.$refs.child.confirmBtnDisabled();
				},
				cancelDisable: function() {
					this.$refs.child.cancelBtnDisabled();
				}
			}
		});
	}
};
