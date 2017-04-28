import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from '@/pages/CreateUser/CreateUser'
import LandingPage from '@/pages/LandingPage/LandingPage'
import Signin from '@/pages/Signin/Signin'
import Collections from '@/pages/Collections/Collections'
import Search from '@/pages/Search/Search'
import Profile from '@/pages/Profile/Profile'
import Manual from '@/pages/Manual/Manual'
import ManageCollection from '@/pages/ManageCollections/ManageCollections'

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
      path: '/collection/:id',
      name: 'Collection',
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
      path: '/collections',
      name: 'ManageCollection',
      component: ManageCollection,
    }
  ]
})
