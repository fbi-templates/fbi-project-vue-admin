import axios from 'axios'
import { router } from '../router'
import configs from '../configs'

// docs: https://github.com/mzabriskie/axios
const instance = axios.create({
  baseURL: __APIROOT__,
  timeout: 1 * 1000
})

if (window.localStorage.getItem(configs.authTokenKey)) {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${window.localStorage.getItem(configs.authTokenKey)}`
}

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response)
  }
)

export default instance
