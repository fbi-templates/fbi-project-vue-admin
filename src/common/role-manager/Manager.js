// Fork from 'https://github.com/anthonygore/vue-router-user-roles/blob/master/src/RouteProtect.js'

import Vue from 'vue'

export default class Manager {
  constructor (
    opts = {
      router: null,
      redirect: 'login'
    }
  ) {
    this.router = opts.router
    this.defaultRedirect = opts.redirect
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
          name: redirect
        })
      }
    }
  }

  hasAccess (roles) {
    const targetRoles = Array.isArray(roles) ? roles : [roles]
    const userRoles = Array.isArray(this.vm.user.roles)
      ? this.vm.user.roles
      : [this.vm.user.roles]

    return userRoles.some(role => targetRoles.includes(role))
  }

  hasAccessToRoute (route) {
    if (route.meta && route.meta.permissions) {
      const targetRoles = route.meta.permissions
      if (!this.vm.user) {
        return {
          access: false,
          redirect: this.defaultRedirect
        }
      } else {
        const userRoles = Array.isArray(this.vm.user.roles)
          ? this.vm.user.roles
          : [this.vm.user.roles]
        let matched
        for (let target of targetRoles) {
          if (matched) break
          if (Array.isArray(target.roles)) {
            for (let roleItem of target.roles) {
              if (userRoles.includes(roleItem)) {
                matched = target
                if (matched) break
              }
            }
          } else if (typeof target.roles === 'string') {
            if (userRoles.includes(target.roles)) {
              matched = target
            }
          }
        }

        if (matched) {
          if (
            (typeof matched.access === 'boolean' && !matched.access) ||
            (typeof matched.access === 'function' &&
              !matched.access(this.vm.user, route))
          ) {
            return {
              access: false,
              redirect: matched.redirect
            }
          }
        }
      }
    }

    return {
      access: true
    }
  }

  resolve (to, from, next) {
    this.to = to

    const { access, redirect } = this.hasAccessToRoute(to)
    console.log(
      `[RoleManager] access to "${to.path}" ${!access ? 'not allowed, redirect to  "' + redirect + '"' : 'allowed'} `
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
}
