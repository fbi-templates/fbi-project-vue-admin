import userApi from '../../api/user'
import { getToken, setToken, delToken } from '../../utils/auth'

const getters = {}

const state = {
  token: getToken(),
  info: null,
  roles: []
}

const mutations = {
  SET_INFO: (state, data) => {
    state.info = data
  },
  SET_ROLES: (state, data) => {
    state.roles = data
  }
}

const actions = {
  login (ctx, params) {
    return userApi.login(params).then(res => {
      const ret = res.data
      if (ret && ret.code === 0) {
        ctx.commit('SET_INFO', ret.data)
        setToken(ret.data.token)
      }
      return ret
    })
  },
  logout (ctx) {
    delToken()
    ctx.commit('SET_INFO', null)
    return Promise.resolve()
  },
  roles (ctx) {
    return userApi.roles().then(res => {
      const ret = res.data
      if (ret && ret.code === 0) {
        ctx.commit('SET_ROLES', ret.data)
      }
      return ret
    })
  },
  current (ctx, params) {
    if (ctx.state.info) {
      return ctx.state.info
    }

    const token = getToken()

    if (!token) {
      return null
    }

    return userApi
      .current({
        token
      })
      .then(res => {
        if (res.data.code !== 0) {
          delToken()
          return null
        } else {
          ctx.commit('SET_INFO', res.data.data)
          return res.data.data
        }
      })
  },
  list (ctx, params) {
    return userApi.info(params)
  },
  hasLogin (ctx) {
    return ctx.state.token
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
