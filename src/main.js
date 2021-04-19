/**
 * 项目的启动入口
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入第三方导出Excel表格数据
import JsonExcel from 'vue-json-excel'

// 加载echarts
import echarts from 'echarts'

// 加载element组件库
import ElementUI from 'element-ui'

// 加载element组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式文件
import './styles/index.scss'

// 全局注册element组件库
Vue.use(ElementUI)

Vue.component('downloadExcel', JsonExcel)

// 将echarts对象挂载到Vue的原型对象上
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
