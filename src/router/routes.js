export default [
  {
    path: 'list',
    name: 'List',
    component: () => import('@/views/list' /* webpackChunkName: "list" */)
  },
  {
    path: 'form',
    name: 'Form',
    component: () => import('@/views/form' /* webpackChunkName: "form" */)
  }
]
