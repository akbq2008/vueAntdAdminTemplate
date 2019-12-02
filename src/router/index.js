import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouteView, BasicLayout, UserLayout } from '@/layouts';
Vue.use(VueRouter);
/**
 * 一级路由如果不需要侧边栏compoent可以使用UserLayout
 * 使用侧边栏的comonent为BasicLayout,
 * 三级component为RouteView
 * path 路由地址
 * name 名字唯一
 * component 需要加载的组件
 * meta 路由元信息,可配置项为title:菜单名字,keepAlive:是否缓存,hidden:是否显示
 * redirect 重定向
 * children 是否有子路由
 */
const routes = [
  {
    path: '/',
    name: 'form',
    redirect: '/form/table',
    component: BasicLayout,
    meta: { title: '表单' },
    children: [
      {
        path: '/form/table',
        name: 'table',
        component: () => import('@/views/form/table'),
        meta: { title: '简单表格' }
      },
      {
        path: '/form/control',
        redirect: '/form/control/1',
        name: 'control',
        component: RouteView,
        meta: { title: '控件' },
        children: [
          {
            path: '/form/control/1',
            name: 'control1',
            meta: { title: '其他控件1' },
            component: () => import('@/views/form/control/index1')
          },
          {
            path: '/form/control/2',
            name: 'control2',
            meta: { title: '其他控件2' },
            component: () => import('@/views/form/control/index2')
          }
        ]
      },
      {
        path: '/form/demo',
        redirect: '/form/demo/1',
        name: 'demo',
        component: RouteView,
        meta: { title: '案例' },
        children: [
          {
            path: '/form/demo/1',
            name: 'demo1',
            meta: { title: '案例1' },
            component: () => import('@/views/form/demo/index1')
          },
          {
            path: '/form/demo/2',
            name: 'demo2',
            meta: { title: '案例2' },
            component: () => import('@/views/form/demo/index2')
          },
          {
            path: '/form/demo/3',
            name: 'demo3',
            meta: { title: '案例3' },
            component: () => import('@/views/form/demo/index3')
          },
          {
            path: '/form/demo/4',
            name: 'demo4',
            meta: { title: '案例4' },
            component: () => import('@/views/form/demo/index4')
          }
        ]
      }

    ]
  },
  {
    path: '/exception',
    name: 'exception',
    component: BasicLayout,
    redirect: '/exception/403',
    meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () =>
          import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
        meta: { title: '403', permission: ['exception'] }
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () =>
          import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: '404', permission: ['exception'] }
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () =>
          import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
        meta: { title: '500', permission: ['exception'] }
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      }
    ]
  }
];
const mainMenu = new VueRouter({
  mode: 'history',
  routes
});
export default mainMenu;
