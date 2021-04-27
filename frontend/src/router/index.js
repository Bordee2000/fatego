import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/servant/servantList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/servantDetail/:id',
    name: 'servantDetail',
    component: () => import('../views/servant/servantDetail.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
