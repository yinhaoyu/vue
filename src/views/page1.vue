<template>
	<div>
		<div @click="goHome">page1</div>
		<div @click="successPop">点击弹出正确pop</div>
		<div @click="errorPop">点击弹出错误pop</div>
		<div @click="modalPop">点击弹出modal</div>
		<div @click="goPhoto">点击跳转头像上传</div>
	</div>
</template>

<script>
import popService from '../service/base/popup.js';
import modalService from '../service/base/modal.js';
export default {
	data() {
		return {
			yhy: '我是页面099999'
		};
	},
	created() {
		console.log('我是页面1');
	},
	methods: {
		goHome() {
			this.$router.push('/');
		},
		goPhoto(){
			this.$router.push('/photo');
		},
		successPop() {
			popService.showSuccee('我是正确的pop');
		},
		errorPop() {
			popService.showError('我是错误的pop');
		},
		modalPop() {
			let modal = modalService.show({
				data: {
					yhycon: this.yhy
				},
				popClass: 'yhy-modal',
				btnCount: 2,
				title: '发票信息',
				confirmBtn: '确定',
				cancelBtn: '关闭',
				content: "<div class='password-input'>{{yhycon}}<div>",
				confirm: () => {
					console.log('点击确定');
					modal.hide();
				},
				cancel: () => {
					console.log('点击取消');
					modal.hide();
				}
			});
			// modal.confirmDisable();
			// modal.cancelDisable();
		}
	}
};
</script>

<style lang="scss">
.yhy-pop {
	.title {
		color: red;
	}
	.cont {
		.password-input {
			text-align: center;
		}
	}
}
</style>
