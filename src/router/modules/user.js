import Layout from '@/components/layout'

export default [
  {
    path: '/user',
    component: Layout,
    name: 'user',
    alwaysShow: true,
    redirect: {
      name: 'userList'
    },
    meta: {
      icon: 'user',
      roles: {
        allow: ['admin']
      }
    },
    children: [
      {
        path: 'list',
        name: 'userList',
        component: () => import('@/views/user/List' /* webpackChunkName: "user" */),
        meta: {
          icon: 'user'
        }
      },
      {
        path: 'role',
        name: 'userRole',
        component: () => import('@/views/user/Roles' /* webpackChunkName: "user" */),
        meta: {
          icon: 'role'
        }
      }
    ]
  }
]
