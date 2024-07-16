import { createRouter, createWebHistory } from 'vue-router'

export const history = createWebHistory()
export const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      // We will implement this component later
      component: () => import('./components/HomeAuthgear.vue')
    },
    {
      path: '/auth-redirect',
      // We will implement this component later
      component: () => import('./components/AuthRedirect.vue')
    },
    {
      path: '/promote-redirect',
      component: () => import('./components/PromoteRedirect.vue')
    }
  ]
})
