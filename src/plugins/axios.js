'use strict'

import Vue from 'vue'
import axios from 'axios'

// 项目依赖
import router from '@/router'

// 组件
import {Message} from 'element-ui'

// 依赖
import Cookies from 'js-cookie'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_Authorization;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
	baseURL: process.env.VUE_APP_API || '',
	timeout: 60 * 1000 // Timeout
	// withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
	function(config) {
		/**
		 * @description 登录前判断本地是否有存 Authorization 信息
		 * 	- 如果有 Authorization 把它放到 config 和 headers 里面
		 * 	- 如果没有，就跳转到登录页面
		 */
		const url = config.url
		const loginReg = /login$/
		if (!loginReg.test(url)) {
			const Authorization = Cookies.get('Authorization')
			if (!Authorization) {
				router.push({name: 'login'})
			} else {
				config.headers.Authorization = Authorization
			}
		}
		// Do something before request is sent
		return config
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
_axios.interceptors.response.use(
	function(response) {
		const data = response.data
		if (data.status) {
			return {
				data: data.data,
				res: response
			}
		} else {
			Message({
				type: 'error',
				message: data.message
			})
			// TODO 根据不同的 code 值判断错误提醒和接下来的行为
			switch(data.code) {
				case 'NO_PERMISSION':
					router.push({name: 'login'})
					break
				default:
					break
			}
		}
		// Do something with response data
		return response
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error)
	}
)

Plugin.install = function(Vue) {
	Vue.axios = _axios
	window.axios = _axios
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios
			}
		},
		$axios: {
			get() {
				return _axios
			}
		}
	})
}

Vue.use(Plugin)

export default Plugin
