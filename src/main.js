import Vue from 'vue'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'

import router from './router'
import store from './store'

import '@/common/icons'
import i18n from '@/common/lang'
import App from './App.vue'
import ajax from '@/utils/ajax'
import cookie from '@/utils/cookie'
import * as filters from '@/common/filters'
import RoleManager from '@/common/role-manager'

// Vue config
Vue.config.productionTip = false
Vue.config.devtools = ENV === 'dev'

// RoleManager
Vue.use(RoleManager, {
  router,
  redirect: 'login'
})

// global filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// global methods
Vue.prototype.ajax = ajax

// ElementUI
Vue.use(ElementUI, {
  size: cookie.get('size') || 'small',
  i18n: (key, value) => i18n.t(key, value)
})

store.dispatch('user/current').then(res => {
  Vue.prototype.$user.set(res)

  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
  })
})
