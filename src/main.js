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
  .then(({ Vue, addApolloClients }) => {
    Vue.prototype.$appName = `${APP_NAME}`

    addApolloClients([
      {
        //  name 为客户端名称，对应 vue-apollo 的 'client' 参数
        name: `${APP_NAME}`,
        // Graphql Server 绝对地址
        uri: 'http://localhost:5000/graphql/projects'
      },
      {
        // 文件上传客户端
        name: `${APP_NAME}-upload`,
        uri: 'http://localhost:5000/graphql/projects',
        upload: true
      }
    ])
  })
  .catch(err => {
    console.error(err)
  })
