import Vue from 'vue'
import Router from 'vue-router'
import hook from './hook'

import basicRoutes from './modules/basic'
import userRoutes from './modules/user'

Vue.use(Router)

const routes = [...userRoutes, ...basicRoutes]

const router = new Router({
  routes,
  mode: 'history',
  base: ROUTE_BASE,
  scrollBehavior: () => ({
    y: 0
  })
})

hook(router)

export default router
