import Vue from 'vue';
import VueRouter from 'vue-router';
// BasicLayout, BlankLayout,
import { RouteView, BasicLayout, UserLayout } from '@/layouts';
Vue.use(VueRouter);
/**
 * 一级路由如果不需要侧边栏compoent可以使用UserLayout
 * 使用侧边栏的comonent为BasicLayout,
 * 三级component为RouteView
 *
 */
const routes = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: { title: '首页' },
  redirect: '/dashboard/index',
  children: [
    // dashboardmax-height
    {
      path: '/dashboard/index',
      name: 'dashboardIndex',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页二级', keepAlive: true }
    },
    {
      path: '/dashboard/index2',
      name: 'index2',
      component: () => import('@/views/dashboard/index2'),
      meta: { title: '首页二级2', keepAlive: true }
    },
    {
      path: '/dashboard3',
      name: 'dashboard3',
      redirect: '/dashboard/index3',
      component: RouteView,
      meta: { title: '首页二级3', keepAlive: true },
      children: [
        {
          path: '/dashboard/index3',
          name: 'index3',
          component: () => import('@/views/dashboard/index3'),
          meta: { title: '首页二级3-1', keepAlive: true }
        },
        {
          path: '/dashboard/index4',
          name: 'index4',
          component: () => import('@/views/dashboard/index4'),
          meta: { title: '首页二级3-2', keepAlive: true }
        }, {
          path: '/dashboard/index5',
          name: 'index5',
          component: () => import('@/views/dashboard/index5'),
          meta: { title: '首页二级3-3', keepAlive: true }
        }, {
          path: '/dashboard/index6',
          name: 'index6',
          component: () => import('@/views/dashboard/index6'),
          meta: { title: '首页二级3-4', keepAlive: true }
        }
      ]
    }

  ]
},
{
  path: '/form',
  name: 'form',
  redirect: '/form/single',
  component: BasicLayout,
  meta: { title: '表单', keepAlive: true },
  children: [
    {
      path: '/form/grid',
      redirect: '/form/single',
      name: 'grid',
      component: RouteView,
      meta: { title: '控件', keepAlive: true },
      children: [
        {
          path: '/form/single',
          name: 'single',
          component: () => import('@/views/form/grid/singleColumns'),
          meta: { title: '单列联动', keepAlive: true }
        },
        {
          path: '/form/double',
          name: 'double',
          component: () => import('@/views/form/grid/doubleColumns'),
          meta: { title: '双列栅格', keepAlive: true }
        },
        {
          path: '/form/three',
          name: 'three',
          component: () => import('@/views/form/grid/threeColumns'),
          meta: { title: '三列栅格', keepAlive: true }
        }
      ]
    },
    {
      path: '/form/table',
      name: 'table',
      component: () => import('@/views/form/table'),
      meta: { title: '简单表格', keepAlive: true }
    },
    {
      path: '/form/control',
      redirect: '/form/control/1',
      name: 'control',
      component: RouteView,
      meta: { title: '控件', keepAlive: true },
      children: [
        {
          path: '/form/control/1',
          name: 'control1',
          meta: { title: '其他控件1', keepAlive: true },
          component: () => import('@/views/form/control/index1')
        },
        {
          path: '/form/control/2',
          name: 'control2',
          meta: { title: '其他控件2', keepAlive: true },
          component: () => import('@/views/form/control/index2')
        }
      ]
    },
    {
      path: '/form/demo',
      redirect: '/form/demo/1',
      name: 'demo',
      component: RouteView,
      meta: { title: '案例', keepAlive: true },
      children: [
        {
          path: '/form/demo/1',
          name: 'demo1',
          meta: { title: '案例1', keepAlive: true },
          component: () => import('@/views/form/demo/index1')
        },
        {
          path: '/form/demo/2',
          name: 'demo2',
          meta: { title: '案例2', keepAlive: true },
          component: () => import('@/views/form/demo/index2')
        },
        {
          path: '/form/demo/3',
          name: 'demo3',
          meta: { title: '案例3', keepAlive: true },
          component: () => import('@/views/form/demo/index3')
        },
        {
          path: '/form/demo/4',
          name: 'demo4',
          meta: { title: '案例4', keepAlive: true },
          component: () => import('@/views/form/demo/index4')
        }
      ]
    }

  ]
},
// Exception
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
