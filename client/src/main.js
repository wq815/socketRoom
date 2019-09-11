// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import '@/assets/css/index.scss'

import "babel-polyfill";

import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Elementui, { size: 'small' })

let globel = window.globel
import scoket from "vue-socket.io";
Vue.use(new scoket({
  debug: true,
  connection: globel.api.socketApi
  // connection: 'http://263580r9p5.zicp.vip:36117'
}))

import axios from 'axios'
import '@/assets/js/http.js'
Vue.prototype.$axios = axios;

import animejs from 'animejs'
Vue.prototype.$anime = animejs;
console.log('main.js')

Vue.prototype.$vue = Vue;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
