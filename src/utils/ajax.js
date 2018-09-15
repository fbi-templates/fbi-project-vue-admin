import axios from 'axios'

// docs: https://github.com/mzabriskie/axios
const instance = axios.create({
  baseURL: __APIROOT__,
  timeout: 1 * 1000,
  transformResponse: [
    function (res) {
      // 这里可以统一处理接口返回数据
      try {
        const data = JSON.parse(res)
        // if (data.code == 0) {
        //   return data.data
        // } else {
        //   throw new Error(data.data)
        // }
        return data
      } catch (err) {
        throw new Error(res)
      }
    }
  ]
  // adapter: function (config) {
  //   console.log('arguments:', arguments)
  //   return new Promise(function (resolve, reject) {
  //     const data = config.data
  //     const headers = config.headers
  //     resolve({ code: 0, data: 'aaaa' })
  //   })
  // }
})

export default instance
