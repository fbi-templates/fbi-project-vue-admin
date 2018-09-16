// Fork from 'https://github.com/anthonygore/vue-router-user-roles/blob/master/src/RouteProtect.js'

import Vue from 'vue'

export default class Manager {
  constructor (
    {
      router = null,
      redirect = 'login',
      metaName = 'roles',
      fieldName = 'roles',
      debug = false
    } = {}
  ) {
    this.router = router
    this.defaultRedirect = redirect
    this.metaName = metaName
    this.fieldName = fieldName
    this.debug = debug

    this.vm = new Vue({
      data: {
        user: null
      }
    })
  }

  get () {
    if (!this.vm.user) {
      throw new Error('Attempt to access user before being set')
    }
    return this.vm.user
  }

  set (user) {
    this.vm.user = user
    if (this.to && this.router) {
      const { access, redirect } = this.hasAccessToRoute(this.to)
      if (!access) {
        this.router.push({
          name: redirect,
          query: {
            redirect: this.to.path
          }
        })
      }
    }
  }

  /**
   * getRolesFromMeta
   *
   m: (user, route) => {
     return {
       allow: 'role1',
       deny: 'role3',
       redirect: ''
     }
   }

   m: 'role1'
   m: 1

   m: ['role1', 'role2']
   m: [1, 2]

   m: {
     allow: 'role1',
     deny: 'role3',
     redirect: ''
   }

   m: {
     allow: ['role1', 'role2'],
     deny: ['role3']
   }

   m: {
     allow: (user, route) => {
       return ['role1', 'role2']
     }
   }
   * @param {*} route
   * @returns
   * @memberof Manager
   */
  getMetaRoles (route) {
    let configs = {
      allow: null,
      deny: null,
      redirect: null
    }

    if (!route.meta || !route.meta[this.metaName]) {
      return configs
    }

    const meta = route.meta[this.metaName]

    if (typeof meta === 'function') {
      return meta(this.vm.user, route)
    }

    configs.redirect = meta.redirect || this.defaultRedirect

    if (this._isValidRoleName(meta)) {
      configs.allow = [meta]
      return configs
    }

    if (Array.isArray(meta)) {
      configs.allow = meta.filter(this._isValidRoleName)
      return configs
    }

    if (this._isJson(meta)) {
      if (meta.allow) {
        if (Array.isArray(meta.allow)) {
          configs.allow = meta.allow.filter(this._isValidRoleName)
        } else if (typeof meta.allow === 'function') {
          const _meta = meta.allow(this.vm.user, route)
          configs.allow = Array.isArray(_meta) ? _meta : [_meta]
        } else if (this._isValidRoleName(meta.allow)) {
          configs.allow = [meta.allow]
        }
      }
      if (meta.deny) {
        if (Array.isArray(meta.deny)) {
          configs.deny = meta.deny.filter(this._isValidRoleName)
        } else if (typeof meta.deny === 'function') {
          const _meta = meta.deny(this.vm.user, route)
          configs.deny = Array.isArray(_meta) ? _meta : [_meta]
        } else if (this._isValidRoleName(meta.deny)) {
          configs.deny = [meta.deny]
        }
      }
    }

    return configs
  }

  getUserRoles () {
    const user = this.vm.user
    if (!user) {
      return []
    }

    return Array.isArray(user[this.fieldName])
      ? user[this.fieldName]
      : [user[this.fieldName]]
  }

  hasAccess (_configs) {
    if (!_configs) {
      throw new Error('param is required')
    }
    const configs = Array.isArray(configs) ? configs : [configs]
    const roles = this.getUserRoles()
    return roles.some(role => configs.includes(role))
  }

  hasAccessToRoute (route) {
    // user roles
    const roles = this.getUserRoles()
    const routes = route.matched || [route]

    let result
    for (let i = routes.length - 1; i >= 0; i--) {
      const item = routes[i]

      const configs = this.getMetaRoles(item)

      if (configs.deny && roles.some(r => configs.deny.includes(r))) {
        result = {
          access: false,
          redirect: configs.redirect
        }

        break
      } else if (configs.allow && !roles.some(r => configs.allow.includes(r))) {
        result = {
          access: false,
          redirect: configs.redirect
        }
        break
      }
    }

    this.debug &&
      console.log('[RoleManager] check:', route.path, result ? 'deny' : 'allow')

    return (
      result || {
        access: true
      }
    )
  }

  resolve (to, from, next) {
    this.to = to

    const { access, redirect } = this.hasAccessToRoute(to)

    this.debug &&
      console.log(
        '[RoleManager] user',
        this.vm.user,
        'route',
        to,
        `${!access ? 'deny, redirect to  "' + redirect + '"' : 'allow'} `
      )

    access
      ? next()
      : next({
        name: redirect,
        query: {
          redirect: to.path
        }
      })
  }

  addRoutes (routes) {
    let allowdRoutes
    const _routes = Array.isArray(routes) ? routes : [routes]
    allowdRoutes = this._routesFilter(_routes)

    if (allowdRoutes.length > 0) {
      this.router.addRoutes(allowdRoutes, {
        replace: true
      })
    }

    return allowdRoutes
  }

  _routesFilter (routes) {
    const allowedRoutes = routes.filter(route => {
      const tmp = this.hasAccessToRoute(route)
      if (tmp.access) {
        if (route.children && route.children.length) {
          route.children = this._routesFilter(route.children)
        }
        return true
      }
      return false
    })
    return allowedRoutes
  }

  _isValidRoleName (name) {
    return typeof name === 'string' || !isNaN(name)
  }

  _isJson (obj) {
    try {
      return obj.constructor === {}.constructor
    } catch (err) {}
    return false
  }
}
