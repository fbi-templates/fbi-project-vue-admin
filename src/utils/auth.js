import cookie from './cookie'
import configs from '@/configs'

export function getToken () {
  return cookie.get(configs.authTokenKey)
}

export function setToken (token) {
  return cookie.set(configs.authTokenKey, token)
}

export function delToken () {
  return cookie.remove(configs.authTokenKey)
}
