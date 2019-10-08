import Vue from 'vue'
import SvgIcon from './svg-icon'
import PageTitle from './page-title'
import DynamicList from './dynamic-list'
import DynamicForm from './dynamic-form'
import DynamicInfo from './dynamic-info'

// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('page-title', PageTitle)
Vue.component('dynamic-list', DynamicList)
Vue.component('dynamic-form', DynamicForm)
Vue.component('dynamic-info', DynamicInfo)

// load all svgs
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/svg', false, /\.svg$/)
requireAll(req)
