import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  }
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('../views/Home/index.vue')
  // }
]

export default createRouter({
  history: createWebHistory(),
  routes
})