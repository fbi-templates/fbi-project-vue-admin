import vueAdmin from '@peak-stone/vue-admin'
import routes from './routes'
import langs from './langs'

const app = {
  id: `${APP_NAME}`,
  name: `${APP_NAME}-main`,
  meta: {
    icon: 'component'
  }
}

vueAdmin(routes, langs, app)
  .then(({ Vue }) => {
    Vue.prototype.$appName = `${APP_NAME}`
  })
  .catch(err => {
    console.error(err)
  })
