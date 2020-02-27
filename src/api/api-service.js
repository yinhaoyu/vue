/**
 *
 * 项目接口
 * @author yhy
 *
 */
import api from './api-config.js';
export default {
	/**
	 * 连接JSBridge
	 * @return {Object}    promise对象
	 */
	connectJsBridge: function() {
		return new Promise(function(resolve, reject) {
			let connectWebViewJavascriptBridge = callback => {
				if (window.WebViewJavascriptBridge) {
					callback(WebViewJavascriptBridge);
				} else {
					document.addEventListener(
						'WebViewJavascriptBridgeReady',
						function() {
							callback(WebViewJavascriptBridge);
						},
						false
					);
				}

				//iOS使用
				if (this.GLOBAL.isIos()) {
					if (window.WebViewJavascriptBridge) {
						return callback(WebViewJavascriptBridge);
					}
					if (window.WVJBCallbacks) {
						return window.WVJBCallbacks.push(callback);
					}
					window.WVJBCallbacks = [callback];
					var WVJBIframe = document.createElement('iframe');
					WVJBIframe.style.display = 'none';
					WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
					document.documentElement.appendChild(WVJBIframe);
					setTimeout(function() {
						document.documentElement.removeChild(WVJBIframe);
					}, 0);
				}
			};

			connectWebViewJavascriptBridge(bridge => {
				if (this.GLOBAL.isAndroid()) {
					bridge.init(function(message, responseCallback) {
						var data = {
							'Javascript Responds': 'Wee!'
						};
						responseCallback(data);
					});

					bridge.registerHandler('functionInJs', function(
						data,
						responseCallback
					) {
						document.getElementById('show').innerHTML =
							'data from Java: = ' + data;
						var responseData = 'Javascript Says Right back aka!';
						responseCallback(responseData);
					});
				}

				this.GLOBAL.JsBridge = bridge;
				resolve(bridge);
			});
		});
	},

	/**
	 * 从app获取uid、sid
	 * @return {Object}    promise对象
	 */
	getUserInfoFromApp: function() {
		return new Promise((resolve, reject) => {
			let getInfo = bridge => {
				bridge.callHandler('getUserInfo', '', responseData => {
					let data = JSON.parse(responseData);
					if (data.uid) {
						resolve(data);
					} else {
						this.loginToApp();
					}
				});
			};
			if (this.GLOBAL.JsBridge) {
				getInfo(this.GLOBAL.JsBridge);
			} else {
				this.connectJsBridge().then(bridge => {
					getInfo(bridge);
				});
			}
		});
	},
	/**
	 * 仅从app获取uid sid 判断是否登录
	 * @return {Object}    promise对象
	 */
	getUserInfoNoLogin: function() {
		return new Promise((resolve, reject) => {
			let getInfo = bridge => {
				bridge.callHandler('getUserInfo', '', responseData => {
					let data = JSON.parse(responseData);
					resolve(data);
				});
			};

			if (this.GLOBAL.JsBridge) {
				getInfo(this.GLOBAL.JsBridge);
			} else {
				this.connectJsBridge().then(bridge => {
					getInfo(bridge);
				});
			}
		});
	},

	/**
	 * 跳转到app登录
	 * @return {Object}    promise对象
	 */
	loginToApp: function() {
		return new Promise((resolve, reject) => {
			let login = bridge => {
				bridge.callHandler('pushLoginIn', '', responseData => {});
			};

			if (this.GLOBAL.JsBridge) {
				login(this.GLOBAL.JsBridge);
			} else {
				this.connectJsBridge().then(bridge => {
					login(bridge);
				});
			}
		});
	},

}
