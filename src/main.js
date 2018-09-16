import Vue from 'vue'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'

import router from '@/router'
import store from '@/store'

import '@/common/icons'
import i18n from '@/common/lang'
import App from '@/App.vue'
import ajax from '@/utils/ajax'
import cookie from '@/utils/cookie'
import * as filters from '@/common/filters'
import RoleManager from '@/common/role-manager'

// Vue config
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

// RoleManager
Vue.use(RoleManager, {
  router,
  redirect: 'login',
  metaName: 'roles',
  fieldName: 'roles',
  debug: process.env.NODE_ENV === 'development'
})

// Global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Global methods
Vue.prototype.$ajax = ajax

// ElementUI
Vue.use(ElementUI, {
  size: cookie.get('size') || 'small',
  i18n: (key, value) => i18n.t(key, value)
})

store.dispatch('user/current').then(userinfo => {
  // Important!!
  Vue.prototype.$user.set(userinfo)

  // Dynamically add routes
  if (process.env.NODE_ENV === 'development') {
    // examples (only for dev env)
    const exampleRoutes = require('@/examples/routes').default
    const filteredNewRoutes = Vue.prototype.$user.addRoutes(exampleRoutes)

    // Update menu
    store.dispatch(
      'app/setRoutes',
      filteredNewRoutes.concat(router.options.routes)
    )
  }

  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
  })
})
