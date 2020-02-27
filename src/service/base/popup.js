/**
 *
 * 弹出层Service
 *
 */

import Vue from 'vue/dist/vue.esm.js'
import PopupComp from '../../components/popup/popup.vue'

let showPopup = function(msg, type) {
	var el =
		document.getElementById('j-popup') || document.createElement('div');
	el.id = 'j-popup';
	el.innerHTML = '<popup-comp :msg="msg" :type="type"></popup-comp>';

	document.getElementsByTagName('body')[0].appendChild(el);
	/* eslint-disable no-new */
	new Vue({
		el: '#j-popup',
		data: {
			msg: msg,
			type: type
		},
		components: {
			PopupComp
		}
	});
};

export default {
	/**
	 * 错误弹出层提示
	 * @param  {String} msg 提示文字
	 * @return null
	 */
	showError: function(msg) {
		showPopup(msg, 0);
	},

	/**
	 * 成功弹出层提示
	 * @param  {String} msg 提示文字
	 * @return null
	 */
	showSuccee: function(msg) {
		showPopup(msg, 1);
	}
};
