import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from '@/pages/CreateUser'
import LandingPage from '@/pages/LandingPage'
import Signin from '@/pages/Signin'
import Collections from '@/pages/Collections'
import Search from '@/pages/Search'
import Profile from '@/pages/Profile'
import Manual from '@/pages/Manual'
import AddCollection from '@/pages/AddCollection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/signup',
      name: 'CreateUser',
      component: CreateUser,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/collections',
      name: 'Collections',
      component: Collections,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/manual',
      name: 'Manual',
      component: Manual,
    },
    {
      path: '/addcollection',
      name: 'AddCollection',
      component: AddCollection,
    }
  ]
})
