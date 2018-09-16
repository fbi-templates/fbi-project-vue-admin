import cookie from '@/utils/cookie'

const getters = {}

const state = {
  routes: [],
  sidebar: {
    opened: !+cookie.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  language: cookie.get('language') || 'en',
  size: cookie.get('size') || 'medium'
}

const mutations = {
  SET_ROUTES (state, routes) {
    state.routes = routes
  },
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      cookie.set('sidebarStatus', 1)
    } else {
      cookie.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    cookie.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    cookie.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    cookie.set('size', size)
  }
}

const actions = {
  setRoutes: ({ commit }, routes) => {
    commit('SET_ROUTES', routes)
  },
  toggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage ({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize ({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
