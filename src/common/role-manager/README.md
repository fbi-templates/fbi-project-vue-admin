# Role Manager

## How to Use?

1. Router config

   > meta.permissions

   ```js
   ...,
   {
     path: '/users',
     name: 'users',
     component: Users,
     meta: {
       permissions: [
         {
           // only 'admin' role can access this route, others will redirect to '401'
           roles: ['admin'],
           access: true,
           redirect: '401'
         }
       ]
     }
   },
   {
     path: '/profile/:id',
     name: 'profile',
     component: Profile,
     meta: {
       permissions: [
         {
           // only 'registered' role and himself can access this role
           role: 'registered',
           access: (user, to) => user.id === to.params.id,
           redirect: 'login'
         },
         {
           // 'guest' role can't access this route, will redirect to login
           role: 'guest',
           access: false,
           redirect: 'login'
         }
       ]
     }
   }
   ```

1. Use the plugin

   ```js
   import Vue from 'vue'
   import router from './router'
   import RoleManager from 'path/to/role-manager'

   Vue.use(RoleManager, { router })

   store.dispatch('user/current').then(userinfo => {
     // set user info
     Vue.prototype.$user.set(userinfo)

     // start app
     new Vue({
       el: '#app',
       router,
       store,
       render: h => h(App),
     })
   })
   ```

1. Use in component

   ```js
   this.$user.set(userinfo, { redirect: false })
   this.$user.set()
   ```

   ```html
   <!-- add class 'is-disabled' for those are neither 'admin' nor 'editor' -->
   <button v-role:class.is-disabled="['admin', 'editor']">Edit</button>

   <!-- only create the button for 'admin' -->
   <button v-role="['admin']">Remove</button>

   <!-- same as above -->
   <!-- action available value: 'remove', 'hidden , 'disable' -->
   <button v-role:action.remove="['admin']">Remove</button>
   ```
