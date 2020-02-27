let user = {}
let JsBridge = null

export default {
	isAndroid() {
		return (
			navigator.userAgent.indexOf('Android') > -1 ||
			navigator.userAgent.indexOf('Adr') > -1
		);
	},
	isIos() {
		return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	},
	user,
	JsBridge
}
