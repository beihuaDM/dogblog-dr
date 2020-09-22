import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category/index')
  },
  {
    path: '/workList',
    name: 'WorkList',
    component: () => import('@/views/workList/index')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/me/index')
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('@/views/comment/index')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
