import Layout from '@/components/Layout'

export default {
  path: '/user',
  component: Layout,
  name: 'user',
  redirect: {
    name: 'userList'
  },
  meta: {
    icon: 'user'
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: () =>
        import('@/views/user/List' /* webpackChunkName: "user" */),
      meta: {
        icon: 'user',
        permissions: [
          {
            roles: ['admin'],
            access: true,
            redirect: '401'
          }
        ]
      }
    },
    {
      path: 'role',
      name: 'userRole',
      component: () =>
        import('@/views/user/Roles' /* webpackChunkName: "user" */),
      meta: {
        icon: 'role',
        permissions: [
          {
            roles: ['admin'],
            access: true,
            redirect: '401'
          }
        ]
      }
    }
  ]
}
