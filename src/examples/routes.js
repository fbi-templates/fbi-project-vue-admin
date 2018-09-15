import Layout from '@/components/Layout'

export default {
  path: '/example',
  component: Layout,
  name: 'example',
  redirect: '/example/icon',
  alwaysShow: true, // will always show the root menu
  meta: {
    icon: 'component'
  },
  children: [
    {
      path: 'icon',
      component: () =>
        import('@/examples/icon' /* webpackChunkName: "examples" */),
      name: 'icon',
      meta: {
        icon: 'icon'
      }
    },
    {
      path: 'form',
      name: 'form',
      component: () =>
        import('@/examples/form' /* webpackChunkName: "examples" */),
      meta: {
        icon: 'form'
      }
    },
    {
      path: 'table',
      name: 'table',
      component: () =>
        import('@/examples/table' /* webpackChunkName: "examples" */),
      meta: {
        icon: 'table'
      }
    },
    {
      path: 'draggable',
      name: 'draggable',
      component: () =>
        import('@/examples/draggable' /* webpackChunkName: "examples" */),
      meta: {
        icon: 'drag'
      }
    },
    {
      path: 'editor',
      name: 'editor',
      component: () =>
        import('@/examples/editor' /* webpackChunkName: "examples" */),
      meta: {
        icon: 'edit'
      }
    },
    {
      path: 'markdown',
      name: 'markdown',
      component: () =>
        import('@/examples/markdown' /* webpackChunkName: "examples" */),
      meta: {
        icon: 'markdown'
      }
    },
    {
      path: 'upload',
      name: 'upload',
      component: () =>
        import('@/examples/upload' /* webpackChunkName: "examples" */),
      meta: {
        icon: 'upload'
      }
    }
  ]
}
