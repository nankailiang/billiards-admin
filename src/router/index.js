import Vue from 'vue'
import VueRouter from 'vue-router'

// 在 VueCLI 创建的项目中 @ 代表 src 目录
// 他是 src 目录的别名
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Member from '@/views/member'

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
