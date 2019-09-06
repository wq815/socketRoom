const USER_SIGNIN = 'USER_SIGNIN' //登录成功
const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录
const USER_INFO_COMMIT = 'USER_INFO_COMMIT' //sessionStorage 传值进state
const USER_MESSAGE_COMMIT = 'USER_MESSAGE_COMMIT' //用户未读信息的实时展示
const LOGIN_TIME = 'LOGIN_TIME'
const RESET_LOGIN_TIME = 'RESET_LOGIN_TIME'

export default {
	[USER_SIGNIN](state, data) {
		state.isUserLogin = sessionStorage.isUserLogin?sessionStorage.isUserLogin:true
		state.userInfo = sessionStorage.userInfo?sessionStorage.userInfo:data
	},
	[USER_SIGNOUT](state, data) {
		state.isUserLogin = false
		state.userInfo = {}
		sessionStorage.clear()
	},
}