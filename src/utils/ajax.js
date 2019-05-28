import axios from 'axios'
import router from '../router'

// docs: https://github.com/mzabriskie/axios
const instance = axios.create({
  baseURL: APIROOT,
  timeout: 1 * 1000
})

if (window.localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
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
