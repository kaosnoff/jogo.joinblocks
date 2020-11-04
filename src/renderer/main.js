import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import * as M from './assets/js/materialize.min'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue(
{
  components: { App },
	data: {
		M:M
	},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
