import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cookie from '@/utils/cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en or zh
  locale: cookie.get('language') || 'en',
  // fallback localization
  fallbackLocale: 'zh',
  // set locale messages
  messages
})

export default i18n
