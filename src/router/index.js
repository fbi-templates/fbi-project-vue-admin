import Vue from 'vue'
import Router from 'vue-router'
import hook from './hook'

import Layout from '@/components/Layout'
import errorRoutes from './modules/error'
import userRoutes from './modules/user'

Vue.use(Router)

export const routes = [
  // public
  errorRoutes,

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login' /* webpackChunkName: "login" */),
    hidden: true
  },

  // private
  {
    path: '/',
    component: Layout,
    redirect: {
      name: 'dashboard'
    },
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import('@/views/dashboard' /* webpackChunkName: "dashboard" */),
        meta: {
          permissions: [
            {
              roles: ['admin'],
              access: true
            }
          ]
        }
      }
    ]
  },

  userRoutes,

  {
    path: '/settings',
    component: Layout,
    meta: {
      permissions: [
        {
          roles: ['admin'],
          access: false
        }
      ]
    },
    children: [
      {
        path: '',
        component: () =>
          import('@/views/settings' /* webpackChunkName: "settings" */),
        name: 'settings',
        meta: {
          icon: 'settings'
          // permissions: [
          //   {
          //     roles: ['admin'],
          //     access: true
          //   }
          // ]
        }
      }
    ]
  },

  {
    path: '*',
    redirect: { name: '404' },
    hidden: true
  }
]

console.log('routes:', routes)

// examples (only for dev env)
if (ENV === 'dev') {
  const exampleRoutes = require('@/examples/routes').default
  routes.unshift(exampleRoutes)
}

const router = new Router({
  base: '/x/',
  routes,
  scrollBehavior: () => ({
    y: 0
  })
})

hook(router)

export default router
