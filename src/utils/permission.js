import router from '@/router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

import {
  getToken
} from '@/utils/auth'; // 验权

import store from '@/store';

const whiteList = ['/login', '/register']; // 不重定向白名单
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
  NProgress.done(); // 结束Progress
});
