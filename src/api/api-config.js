//引用axios
import axios from 'axios'

// 配置API接口地址
let ApiBaseUrl = ''

// 配置content-Type
axios.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8';




// 请求
function apiAxios(method, url, params) {

	return new Promise((resolve, reject) => {
		axios({
				method: method,
				url: url,
				data: method === 'POST' || method === 'PUT' ? params : null,
				params: method === 'GET' || method === 'DELETE' ? params : null,
				baseURL: ApiBaseUrl
			})
			.then(function(res) {
				console.log(res);
				resolve(res)
			})
			.catch(function(err) {
				console.log(err);
				reject(err)
			})
	})
}

// 返回在vue模板中的调用接口
export default {
	get(url) {
		return apiAxios('GET', url, null)
	},
	post(url, params) {
		return apiAxios('POST', url, params)
	},
	put(url, params) {
		return apiAxios('PUT', url, params)
	},
	delete(url) {
		return apiAxios('DELETE', url, null)
	}
}
