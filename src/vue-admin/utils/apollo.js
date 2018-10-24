import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

export function initApollo (Vue) {
  const httpLink = new HttpLink({
    // 你需要在这里使用绝对路径
    // uri: `${GRAPHQL_ENDPOINT}`
    uri: 'http://localhost:3000/graphql'
  })

  // 创建 apollo 客户端
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
  })

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

  // 安装 vue 插件
  Vue.use(VueApollo)

  return apolloProvider
}
