import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible/index.js'
import VueLocalStorage from 'vue-localstorage'
import clipper from './service/base/clipper.js'
import global from './api/global.js'
Vue.prototype.GLOBAL = global


Vue.use(VueLocalStorage)
Vue.use(clipper)

Vue.config.productionTip = false


new Vue({
	router,
	render: h => h(App)
}).$mount('#app')


// this.$localStorage.get('someObject')
//       this.$localStorage.set('someBoolean', true)
//       this.$localStorage.remove('stringOne')
