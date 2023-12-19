import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

router.beforeEach((to, _, next) => {
  if (to.fullPath === '/login') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
