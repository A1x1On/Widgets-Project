import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
})

router.beforeEach(async (to, _, next) => {
  if (to.name === undefined) {
    return next({ path: '/notFound' })
  }

  return next()
})

router.onError((err, to) => {
  console.error('router.onError err', err)
  console.log('router.onError to', to)
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
