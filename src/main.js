import Vue from 'vue'

import 'normalize.css/normalize.css' // 初始化样式

import ElementUI, { Message } from 'element-ui' // elementui
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局样式入口

import App from './App.vue'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // 权限控制

import filter from "@/filters/index";
import directives from "@/directives/index";

Vue.prototype.$message = Message;

Vue.use(ElementUI);
Vue.use(filter);
Vue.use(directives);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
