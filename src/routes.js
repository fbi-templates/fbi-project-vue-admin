export default [
  {
    path: 'list',
    name: `${ROUTE_NAME_PREFIX}-List`,
    component: () => import('@/views/list' /* webpackChunkName: "list" */)
  },
  {
    path: 'form',
    name: `${ROUTE_NAME_PREFIX}-Form`,
    component: () => import('@/views/form' /* webpackChunkName: "form" */)
  }
]
