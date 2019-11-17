import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import '@/utils/permission';
import '@/assets/css/antd.scss';
import '@/config/global.scss';
import '@/assets/css/util.css';
import CollapseTransition from '@/components/mainMenu/collapse-transition';
Vue.use(Antd);
Vue.config.productionTip = false;
Vue.component(CollapseTransition.name, CollapseTransition);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
