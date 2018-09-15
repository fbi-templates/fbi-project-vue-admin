import Manager from './Manager'
import directive from './directive'

function plugin (Vue, opts) {
  const manager = new Manager(opts)
  opts.router &&
    opts.router.beforeEach((to, from, next) => manager.resolve(to, from, next))

  Vue.prototype.$user = manager

  Vue.directive('permission', directive(manager))
}

plugin.version = '0.0.1'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
