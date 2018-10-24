import Vue from 'vue'
import VueRouter from 'vue-router'
import hook from './hook'
import Layout from '../components/Layout'
import basicRoutes from './modules/basic'

Vue.use(VueRouter)
window.VueRouter = VueRouter
let routerIns

export function routerInit (routes) {
  routerIns = new VueRouter({
    routes: [
      ...basicRoutes,
      {
        path: '/',
        component: Layout,
        name: 'app',
        children: routes
      }
    ],
    scrollBehavior: () => ({
      y: 0
    })
  })

  hook(routerIns)

  return routerIns
}

export const router = routerIns
