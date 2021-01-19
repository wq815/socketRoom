const USER_SIGNIN = 'USER_SIGNIN' //登录成功
const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录
const USER_INFO_COMMIT = 'USER_INFO_COMMIT' //sessionStorage 传值进state
const USER_MESSAGE_COMMIT = 'USER_MESSAGE_COMMIT' //用户未读信息的实时展示
const LOGIN_TIME = 'LOGIN_TIME'
const RESET_LOGIN_TIME = 'RESET_LOGIN_TIME'
const USER_COUNT = 'USER_COUNT'
const USER_SOCKET_ID = 'USER_SOCKET_ID'

export default {
    [USER_SIGNIN]({ commit }, user) {
        commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT]({ commit }) {
        commit(USER_SIGNOUT)
    },
    [USER_COUNT]({ commit }, data) {
        commit(USER_COUNT, data)
    },
    [USER_SOCKET_ID]({ commit }, data) {
        commit(USER_SOCKET_ID, data)
    }
}