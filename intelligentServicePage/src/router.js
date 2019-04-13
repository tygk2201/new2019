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
      component:resolve => require(['@/views/login'],resolve),
    },
    {
      path: '/information/advertise',
      hidden: true,
      component:resolve => require(['@/views/information/advertise'],resolve),
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      name: 'home',
      // hidden: true,
      children: [{
        path: 'home',
        component:resolve => require(['@/views/home/index'],resolve),
        meta: { title: '主页(开发中)', icon: 'link' },
      }]
    },
    {
      path: '/intelligent',
      component: Layout,
      redirect: '/intelligent/first',
      name: 'intelligent',
      meta: { title: 'AI机器人(开发中)', icon: 'tree' },
      children: [{
        path: 'second',
        name:'second',
        component:resolve => require(['@/views/intelligent/second/index'],resolve),
        meta: { title: '数据列表', icon: 'table' }
      },{
        path: 'first',
        name:'first',
        component:resolve => require(['@/views/intelligent/first/index'],resolve),
        meta: { title: '测试', icon: 'table' }
      }]
    },
    {
      path: '/information',
      component: Layout,
      redirect: '/information/notice',
      name: 'information',
      meta: { title: '广告营销', icon: 'tree' },
      children: [{
        path: 'notice',
        name:'notice',
        component:resolve => require(['@/views/information/notice'],resolve),
        meta: { title: '消息中心', icon: 'table' }
      },{
        path: '/information/advertise',
        meta: { title: '广告推广', icon: 'table' }
      }]
    },
  ]
})
