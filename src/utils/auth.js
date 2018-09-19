import configs from '@/configs'

export function getToken () {
  return localStorage.getItem(configs.authTokenKey)
}

export function setToken (token) {
  return localStorage.setItem(configs.authTokenKey, token)
}

export function delToken () {
  return localStorage.removeItem(configs.authTokenKey)
}
