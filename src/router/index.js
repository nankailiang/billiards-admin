import Vue from 'vue'
import VueRouter from 'vue-router'

// 在 VueCLI 创建的项目中 @ 代表 src 目录
// 他是 src 目录的别名
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Member from '@/views/member'
import Recharge from '@/views/recharge'
import Consume from '@/views/consume'
import Analyse from '@/views/analyse'
import User from '@/views/user'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'member',
        name: 'member',
        component: Member
      },
      {
        path: 'recharge',
        name: 'recharge',
        component: Recharge
      },
      {
        path: 'consume',
        name: 'consume',
        component: Consume
      },
      {
        path: 'analyse',
        name: 'analyse',
        component: Analyse
      },
      {
        path: 'user',
        name: 'user',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')

  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
