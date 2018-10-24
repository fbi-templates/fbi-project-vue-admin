import vueAdmin from './vue-admin'
import routes from './routes'
import langs from './langs'

const { Vue, router, store } = vueAdmin(routes, langs)
