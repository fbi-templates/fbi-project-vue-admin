import Vue from 'vue'
import Router from 'vue-router'
import hook from './hook'
import Layout from '@/components/Layout'

import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes: [
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

hook(router)

export { router, routes }
