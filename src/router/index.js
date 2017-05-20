import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from '@/pages/CreateUser/CreateUser'
import LandingPage from '@/pages/LandingPage/LandingPage'
import Signin from '@/pages/Signin/Signin'
import Collections from '@/pages/Collections/Collections'
import Search from '@/pages/Search/Search'
import Profile from '@/pages/Profile/Profile'
import Manual from '@/pages/Manual/Manual'
import ManageCollections from '@/pages/ManageCollections/ManageCollections'
import EditComic from '@/pages/EditComic/EditComic'

Vue.use(Router)

const router =   new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
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
            path: '/edit/:comic',
            name: 'EditComic',
            component: EditComic,
            props: true,
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
            path: '/new',
            name: 'Manual',
            component: Manual,
        },
        {
            path: '/collections',
            name: 'ManageCollections',
            component: ManageCollections,
        }
    ],
})

export default router
