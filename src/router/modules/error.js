import Layout from '@/components/Layout'

export default {
  path: '/error',
  component: Layout,
  redirect: 'noredirect',
  hidden: true,
  children: [
    {
      path: 'error-401',
      component: () =>
        import('@/views/error/401' /* webpackChunkName: "error" */),
      name: '401',
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
}
