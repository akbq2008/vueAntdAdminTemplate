import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import '@/utils/permission';
import 'ant-design-vue/dist/antd.less';
import '@/assets/css/common.less';
import 'normalize.css/normalize.css';
Vue.use(Antd);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
