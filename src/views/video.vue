<template>
	<div>
		<div class="video-box">
			<video
				id="myVideo"
				controlslist="nodownload"
				controls
				class="my-video"
				x5-video-player-type="h5"
				x5-video-orientation="landscape"
				webkit-playsinline
				playsinline
				src="https://hd.files.jinzhuanglvshi.com/five/716.mp4"
			></video>
			<div class="video-content" v-show="stateEnd">
				<div class="title">恭喜您学习完成本课内容</div>
				<div class="t-title">您可点击下方按钮继续学习或答题按钮进入本课答题模块</div>
				<div class="btn-box">
					<div @click="replay">
						<img src="../assets/logo.png" />
						<div class="btn">重播</div>
					</div>
					<div>
						<img src="../assets/logo.png" />
						<div class="btn" @click="exameBtn">答题</div>
					</div>
				</div>
			</div>
		</div>
		<div class="div-box" @click="goPage">跳转到page1页面</div>
		<img src="../../public/img/logo.png" alt="">
	</div>
</template>

<script>
import api from '../api/api-service.js';
export default {
	data() {
		return {
			timer: null,
			stateEnd: false
		};
	},
	created() {
		console.log(123123);
	},
	mounted() {
		let that = this;
		let resetTime = 0; // 拖动后重置播放时间
		let curTime = 0; // 当前播放时间
		const vd = document.getElementById('myVideo'); //获取video对象
		that.timer = setInterval(time, 100);
		// 定时器
		function time() {
			curTime = vd.currentTime;
			var apartTime = curTime - resetTime;
			if (apartTime > 2) {
				vd.currentTime = resetTime;
			} else {
				resetTime = curTime;
			}
		}

		vd.addEventListener('play', () => {
			console.log('play');
		});
		vd.addEventListener('pause', () => {
			console.log('pause');
		});

		//监听播放结束
		vd.addEventListener('ended', () => {
			console.log('播放结束');
			this.stateEnd = true;
		});

		//使用事件监听方式捕捉事件， 此事件可作为实时监测video 播放状态
		vd.addEventListener(
			'timeupdate',
			() => {
				var timeDisplay;
				//用秒数来显示当前播放进度
				timeDisplay = Math.floor(vd.currentTime);
				//当视频播放到 4s的时候做处理
				if (timeDisplay == 4) {
					console.log(12312312312312312312);
				}
			},
			false
		);
	},
	methods: {
		goPage() {
			this.$router.push('/page1');
		},
		replay() {
			this.stateEnd = false;
			document.getElementById('myVideo').play();
		},
		//答题透传给app
		exameBtn() {
			let getInfo = bridge => {
				bridge.callHandler('exam', '', responseData => {
					let data = JSON.parse(responseData);
					console.log(data);
				});
			};
			if (this.GLOBAL.JsBridge) {
				getInfo(this.GLOBAL.JsBridge);
			} else {
				api.connectJsBridge().then(bridge => {
					getInfo(bridge);
				});
			}
		}
	}
};
</script>
<style lang="scss">
.video-box {
	width: 100%;
	height: 450px;
	position: relative;
}
.my-video {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.video-content {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: #b24141;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #fff;
	text-align: center;
	.title {
		font-size: 0.533333rem;
		color: #fff;
	}
	.t-title {
		font-size: 0.373333rem;
		color: #fff;
		margin: 10px 0;
	}
	.btn-box {
		width: 100%;
		display: flex;
		justify-content: space-around;
		img {
			width: 50px;
			height: 50px;
		}
		.btn {
			text-align: center;
			font-size: 0.533333rem;
			color: #fff;
		}
	}
}
.div-box {
	width: 500px;
	height: 500px;
	background: #42b983;
	font-size: 50px;
}
</style>
