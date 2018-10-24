import Vue from 'vue'
import VueI18n from 'vue-i18n'
import assigndeep from 'assign-deep'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'

const defaults = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

export function i18nInit (userConfigs) {
  Vue.use(VueI18n)

  const messages = assigndeep({}, defaults, userConfigs || {})

  const i18n = new VueI18n({
    // set locale
    // options: en or zh
    locale: localStorage.getItem('language') || 'en',
    // fallback localization
    fallbackLocale: 'zh',
    // set locale messages
    messages
  })

  return i18n
}
