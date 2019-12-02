import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import {
  getToken
} from '@/utils/auth';
import store from '@/store';
const whiteList = ['/login', '/register'];
let registerRouteFresh = true;
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      });
      NProgress.done();
    } else {
      store.dispatch('setTaskNum');
      if (registerRouteFresh) {
        store.dispatch('GetSetInfo').then(() => {
          router.addRoutes(store.getters.addRoutes);
          registerRouteFresh = false;
          next({
            ...to,
            replace: true
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next();
      //   next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
