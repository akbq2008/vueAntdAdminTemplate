import Vue from 'vue';
import VueRouter from 'vue-router';
// BasicLayout, BlankLayout,
import { RouteView, BasicLayout } from '@/layouts';
Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: { title: '首页', collapse: false },
  redirect: '/dashboard/workplace',
  children: [
    // dashboardmax-height
    {
      path: 'test',
      name: 'index',
      // component: RouteView,
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘1', keepAlive: true, permission: ['dashboard'] }
    },
    {
      path: 'test2',
      name: 'index2',
      component: () => import('@/views/dashboard/index2'),
      meta: { title: '仪表盘2', keepAlive: true, permission: ['dashboard'] }
    },
    {
      path: 'dashboard',
      name: 'dashboard',
      redirect: '/dashboard/workplace',
      component: RouteView,
      meta: { title: '仪表盘', keepAlive: true, collapse: false, permission: ['dashboard'] },
      children: [
        {
          path: '/dashboard/workplace',
          name: 'Workplace',
          component: () => import('@/views/dashboard/Workplace'),
          meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
        },
        {
          path: 'https://www.baidu.com/',
          name: 'Monitor',
          meta: { title: '监控页（外部）', target: '_blank' }
        },
        {
          path: '/dashboard/index',
          name: 'index',
          component: () => import('@/views/dashboard/index'),
          meta: { title: '瓷业', keepAlive: true, permission: ['index'] }
        }
      ]
    }
  ]
},
{
  path: '/index',
  name: 'tstIndex',
  component: BasicLayout,
  meta: { title: '测试仪', icon: 'warning', permission: ['exception'] },
  children: [{
    name: 'tst',
    path: 'test',
    meta: { title: '测试仪', icon: 'warning', permission: ['exception'] },
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/index')
  }]
},
// Exception
{
  path: '/exception',
  name: 'exception',
  component: RouteView,
  redirect: '/exception/403',
  meta: { title: '异常页', icon: 'warning', collapse: false, permission: ['exception'] },
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
}
];
const mainMenu = new VueRouter({
  mode: 'history',
  routes
});
export default mainMenu;

