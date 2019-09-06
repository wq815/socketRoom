import axios from 'axios'
import router from '../../router/index'
import { Loading } from 'element-ui'
let globel = window.globel
axios.defaults.baseURL = globel.api.baseApi

axios.interceptors.request.use(
	config => {
		Open()
		return config;
	},
	err => {
		return Promise.reject(err);
	}
)

axios.interceptors.response.use(
	response => {
		Close();
		//会话过期跳登录页
		return response;
	}, function (error) {
		Close();
		if (error.code == 'ECONNABORTED') {
			return Promise.reject(error)
		}
	}
)


let count = 0;
let loading = null;
export function Open() {
	loading = Loading.service({
		lock: true,
		text: '正在拼命加载',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
		customClass: 'customLoading'
	});
	count++;
}

export function Close() {
	if (count > 0) {
		count--;
	}

	if (count <= 0) loading.close();
	// Indicator.close();
}

export default axios;