import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes, // ← don't forget this
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // ✅ Add guards *after* router is created
  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token')
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !token) {
      next('/login')
    } else {
      next()
    }
  })
  

  return Router
})
