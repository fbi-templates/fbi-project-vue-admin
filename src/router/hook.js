import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

const hooks = {
  beforeEach: [
    function progressStart (to, from, next) {
      NProgress.start()
      next()
    }
  ],
  afterEach: [
    function progressEnd () {
      NProgress.done()
    }
  ]
}

export default router => {
  const actions = Object.keys(hooks)
  if (!router || actions.length <= 0) {
    return
  }

  actions.map(action => {
    if (router[action]) {
      if (Array.isArray(hooks[action])) {
        for (let item of hooks[action]) {
          router[action](item)
        }
      } else if (typeof hooks[action] === 'function') {
        router[action](hooks[action])
      }
    }
  })
}
