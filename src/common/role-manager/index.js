import Manager from './Manager'
import directive from './directive'

function plugin (Vue, opts) {
  const manager = new Manager(opts)

  // router hook
  opts.router &&
    opts.router.beforeEach((to, from, next) => manager.resolve(to, from, next))

  // prototype
  Vue.prototype.$user = manager

  // directive
  Vue.directive('permission', directive(manager))
}

plugin.version = '0.0.1'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
