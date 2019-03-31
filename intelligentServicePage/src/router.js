import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: ()=>import('@/views/login')
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      name: 'home',
      // hidden: true,
      children: [{
        path: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '主页', icon: 'link' },
      }]
    },
    {
      path: '/intelligent',
      component: Layout,
      redirect: '/intelligent/first',
      name: 'intelligent',
      meta: { title: '一级菜单', icon: 'tree' },
      children: [{
        path: 'first',
        name:'first',
        component: () => import('@/views/intelligent/first/index'),
        meta: { title: '菜单一', icon: 'table' }
      },{
        path: 'second',
        name:'second',
        component: () => import('@/views/intelligent/second/index'),
        meta: { title: '菜单二', icon: 'table' }
      }]
    },
    {
      path: '/test',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'test',
          component: () => import('@/views/test/index'),
          meta: { title: 'Test', icon: 'form' }
        }
      ]
    },
  ]
})
