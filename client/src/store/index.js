import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user/index'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user: user
	}
})