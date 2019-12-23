import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store/index'
import JCconfig from '@/utils/config.js'
import JCutils from '@/utils/utils.js'
import JCService from '@/servers/index.js'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.JCutils = JCutils        // 工具文件
Vue.prototype.JCconfig = JCconfig      // 配置文件
Vue.prototype.JCService = JCService    // 接口文件


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

