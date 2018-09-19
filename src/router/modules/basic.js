import Layout from '@/components/Layout'

export default [
  {
    path: '/',
    component: Layout,
    redirect: {
      name: 'dashboard'
    },
    meta: {
      roles: {
        allow: ['admin'],
        redirect: '403'
      }
    },
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import('@/views/dashboard' /* webpackChunkName: "dashboard" */)
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login' /* webpackChunkName: "login" */),
    hidden: true
  },
  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: '',
        component: () =>
          import('@/views/settings' /* webpackChunkName: "settings" */),
        name: 'settings',
        meta: {
          icon: 'settings',
          roles: {
            allow: ['admin'],
            redirect: '403'
          }
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children: [
      {
        path: 'error-403',
        component: () =>
          import('@/views/error/403' /* webpackChunkName: "error" */),
        name: '403',
        meta: {
          noCache: true
        }
      },
      {
        path: '404',
        component: () =>
          import('@/views/error/404' /* webpackChunkName: "error" */),
        name: '404',
        meta: {
          noCache: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: {
      name: '404'
    },
    hidden: true
  }
]
