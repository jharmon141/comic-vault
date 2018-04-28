import Vue from 'vue'
import store from './store.js'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserProfile from './views/UserProfile.vue'

Vue.use(Router)

function requireAuth(to, from, next) {
  if (!store.getters.authenticated) {
    return next({ path: '/' })
  }
  else {
    return next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      beforeEnter: requireAuth
    }
  ]
})