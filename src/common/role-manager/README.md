# Role Manager

## Init the plugin

```js
import RoleManager from 'path/to/role-manager'

Vue.use(RoleManager, options)
```

**options**

- router: (required) vue router instance
- redirect: (optional) default redirect name. default: 'login'
- metaName: (optional) meta name in router config. default: 'roles'
- fieldName: (optional) role field name in user info. default: 'roles'
- debug: (optional) show debug info in console or not. default: false

## Router config

```js
{
  path: '/home',
  name: 'home,
  component: home,
  meta: {
    roles
  }
}
```

**roles**

```js
// String or Number
roles: 'role1'
roles: 1

// Array of String or Number
roles: ['role1', 'role2']
roles: [1, 2]

// Object
roles: {
  allow: 'role1',
  deny: 'role3',
  redirect: 'login'
}

roles: {
  allow: ['role1', 'role2'],
  deny: ['role3']
}

// Function
// user: user info
// route: current router instance
roles: {
  allow: (user, route) => {
    return ['role1', 'role2']
  }
}

roles: (user, route) => {
  return {
    allow: 'role1',
    deny: 'role3',
    redirect: '401'
  }
}
```

## Methods

**set**

```js
// set current user's info
Vue.prototype.$user.set(userinfo)

this.$user.set(null)
```

**get**

```js
// get current user's info
Vue.prototype.$user.get()

this.$user.get()
```

**hasAccess**

```js
// check current user's role
this.$user.hasAccess(['admin', 'editor', 'publisher'])
```

**addRoutes**

```js
const filteredNewRoutes = this.$user.addRoutes([...])
// return filtered new route base on current user's role
```

## Directive

**arg**

- action
- class

**modifiers**

- action: remove, hidden, disable
- class: any string

**Examples**

```html
<!-- only create the button for 'admin' -->
<button v-role="['admin']">Remove</button>

<!-- same as above -->
<!-- action available value: 'remove', 'hidden , 'disable' -->
<button v-role:action.remove="['admin']">Remove</button>

<!-- add class 'my-class-name' for those are neither 'admin' nor 'editor' -->
<button v-role:class.my-class-name="['admin', 'editor']">Edit</button>
```
