import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import store from './store'
import router from './router'

// import VueAMap from 'vue-amap'

import 'reset.css'
import './styles/index.scss'

// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
// 	key: '6832004a2f96d28a0b4e0ec6de768a8c',
// 	plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch'],
// 	v: '1.4.15'
// })

Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
