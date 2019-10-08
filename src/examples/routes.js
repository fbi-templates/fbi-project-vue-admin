import Layout from '@/components/layout'

export default [
  {
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
        name: 'icon',
        component: () => import('@/examples/icon' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'icon'
        }
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('@/examples/dynamic-form-demo' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'form'
        }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/examples/dynamic-list-demo' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'list'
        }
      },
      {
        path: 'info',
        name: 'info',
        component: () => import('@/examples/dynamic-info-demo' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'component'
        }
      },
      {
        path: 'table',
        name: 'table',
        component: () => import('@/examples/table' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'table'
        }
      },
      {
        path: 'draggable',
        name: 'draggable',
        component: () => import('@/examples/draggable' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'drag'
        }
      },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/examples/editor' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'edit'
        }
      },
      {
        path: 'markdown',
        name: 'markdown',
        component: () => import('@/examples/markdown' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'markdown'
        }
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/examples/upload' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'upload'
        }
      },
      {
        path: 'nested',
        name: 'nested',
        component: () => import('@/examples/nested' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'nested',
          // 该菜单项是否路由 (适用于菜单分组标题强制生成链接)
          route: true
        },
        children: [
          {
            path: 'level-1',
            name: 'level-1',
            component: () => import('@/examples/nested/menu1-1' /* webpackChunkName: "examples" */),
            meta: {},
            children: []
          },
          {
            path: 'level-2',
            name: 'level-2',
            component: () => import('@/examples/nested/menu1-2' /* webpackChunkName: "examples" */),
            meta: {},
            children: [
              {
                path: 'level-2-1',
                name: 'level-2-1',
                component: () =>
                  import('@/examples/nested/menu1-2/menu1-2-1' /* webpackChunkName: "examples" */),
                meta: {},
                children: []
              },
              {
                path: 'level-2-2',
                name: 'level-2-2',
                component: () =>
                  import('@/examples/nested/menu1-2/menu1-2-2' /* webpackChunkName: "examples" */),
                meta: {},
                children: []
              }
            ]
          }
        ]
      },
      {
        path: 'external-link',
        component: Layout,
        children: [
          {
            name: 'externalLink',
            path: 'https://github.com/fbi-templates/fbi-project-vue-admin',
            meta: {
              icon: 'link'
            }
          }
        ]
      }
    ]
  }
]
