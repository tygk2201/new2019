import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Element from 'element-ui'
// import {Button,Form,FormItem,Input,Table,Submenu,Dropdown,DropdownItem,DropdownMenu,Menu,MenuItem,
//   TableColumn,Breadcrumb,BreadcrumbItem,Row,Scrollbar,Pagination,Carousel,CarouselItem,Popover,Dialog,Checkbox,CheckboxGroup} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import './icons' // icon
import '@/permission' // permission control
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // global css

// import echarts from 'echarts'
let echarts=require('echarts/lib/echarts')
// 引入折线图等组件
// require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/radar')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Element)
// Vue.use(Button)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Submenu)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(MenuItem)
// Vue.use(Menu)
// Vue.use(BreadcrumbItem)
// Vue.use(Breadcrumb)
// Vue.use(Row)
// Vue.use(Scrollbar)
// Vue.use(Pagination)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Popover)
// Vue.use(Dialog)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
