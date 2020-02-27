<template>
	<transition name="topfead">
		<div class="modal components" v-if="showModal">
			<div class="modal-cont topfead-cont" :class="[popClass]">
				<p class="title" v-if="title">{{ title }}</p>
				<div class="cont"><slot></slot></div>
				<div class="modal-btns">
					<div class="btn-l" :class="{ disabled: confirmDisabled }" @click="confirmDisabled ? '' : _confirm()" v-if="btnCount == 2">{{ confirmBtn }}</div>
					<div class="" :class="{ disabled: cancelDisabled, 'btn-r': btnCount == 2 }" @click="cancelDisabled ? '' : _cancel()">{{ cancelBtn }}</div>
				</div>
			</div>
			<!-- <div class="modal-mask" @click="hideModal"></div> -->
			<div class="modal-mask"></div>
		</div>
	</transition>
</template>
<script>
export default {
	data() {
		return {
			showModal: true,

			confirmDisabled: false,
			cancelDisabled: false
		};
	},
	props: [
		'title',
		'confirmBtn',
		'cancelBtn',
		'confirm',
		'cancel',
		'btnCount', // 按钮个数：仅支持1和2，默认1
		'popClass'
	],
	created() {},
	mounted: function() {},
	methods: {
		// 提交
		_confirm: function() {
			this.confirm ? this.confirm() : this.hideModal();
		},
		// 取消
		_cancel: function() {
			this.cancel ? this.cancel() : this.hideModal();
		},

		// 关闭modal
		hideModal: function() {
			this.showModal = false;
		},

		// 确定按钮不可编辑
		confirmBtnDisabled: function() {
			this.confirmDisabled = !this.confirmDisabled;
		},

		// 取消按钮不可编辑
		cancelBtnDisabled: function() {
			this.cancelDisabled = !this.cancelDisabled;
		}
	}
};
</script>
<style lang="scss">
.modal.components {
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.modal-cont {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 85%;
		transform: translate(-50%, -50%);
		padding-bottom: 25px;
		background-color: #fff;
		z-index: 999;
		border-radius: 10px;
		.title {
			height: 80px;
			border-bottom: 2px solid #ececec;
			line-height: 80px;
			text-align: center;
			font-size: 24px;
			color: #767676;
		}
		.cont {
			padding: 50px;
		}
		.modal-btns {
			display: flex;
			justify-content: center;
			.btn-r {
				margin-left: 23px;
			}
			.disabled {
				color: #42b983 !important;
			}
		}
	}
	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.75);
	}
}
</style>
