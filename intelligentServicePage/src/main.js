import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import './icons' // icon
import '@/permission' // permission control
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // global css
// import '../public/mock' // mock data
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Element,locale)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
