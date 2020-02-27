<template>
	<div class="popup">
		<transition name="topfead">
			<div class="popup-cont popup-error topfead-cont" :class="{ 'popup-succee': type == 1 }" v-if="showMsg">
				<!-- <i class="icon-msg icon-error" :class="{ 'icon-succee': type == 1 }"></i> -->
				<p class="msg">{{ msg }}</p>
			</div>
		</transition>
	</div>
</template>
<script>
export default {
	data() {
		return {
			showMsg: false
		};
	},
	props: [
		'msg',
		'type' // 成功1 失败0
	],

	mounted: function() {
		this.showMsg = true;

		setTimeout(() => {
			this.showMsg = false;
		}, 1500);
	}
};
</script>
<style lang="scss" scoped>
.popup {
	position: fixed;
	top: 50%;
	z-index: 9999;
	left: 50%;
	transform: translate(-50%, -50%);
	.popup-cont {
		position: relative;
		padding: 20px;
		border-radius: 4px;
		.icon-msg {
			position: absolute;
			background-size: cover;
			width: 18px;
			height: 18px;
			top: 16px;
		}
		.msg {
			// padding: 13px 0 13px 24px;
		}
	}
	.popup-error {
		background-color: #fef0f0;
		color: red;
		font-size: 16px;
		.msg {
			color: red;
		}
	}
	.popup-succee {
		background-color: #d5f3e5;
		.msg {
			color: #42b983;
		}
	}
}
</style>
