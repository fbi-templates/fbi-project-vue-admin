import '@babel/polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import VRM from 'vue-role-manager'
import '@/utils/rem'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'

import router from '@/router'
import store from '@/store'
import i18n from '@/global/lang'
import App from '@/App.vue'
import ajax from '@/utils/ajax'
import * as filters from '@/global/filters'
import '@/global/components'
import configs from '@/configs'

// Vue config
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.use(VRM, {
  router,
  redirect: 'login',
  metaName: 'roles',
  whitelist: ['login', '401', '404'],
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
  size: localStorage.getItem('size') || configs.UIDefaultSize,
  i18n: (key, value) => i18n.t(key, value)
})

// Event bus
Vue.prototype.$eventBus = new Vue()

store.dispatch('user/current').then(userinfo => {
  // Important!!
  Vue.prototype.$vrm.setRoles(userinfo ? userinfo.roles : null)

  // Dynamically add routes
  if (process.env.NODE_ENV === 'development') {
    // examples (only for dev env)
    const exampleRoutes = require('@/examples/routes').default
    const { allRoutes } = Vue.prototype.$vrm.addRoutes(exampleRoutes)

    // Update menu
    store.dispatch('app/setRoutes', allRoutes)
  }

  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
  })
})
