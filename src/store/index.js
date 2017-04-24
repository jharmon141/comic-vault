import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        authenticated: false,
        user: {},
        collections: []
    },

    mutations: {

        login: (state)=> {
            state.authenticated = true
        },

        logout: (state)=> {
            state.authenticated = false
            state.user = {}
        },

        setUser: (state, params)=> {
            state.user = {
                id: params.id,
                firstName: params.firstName,
                lastName: params.lastName,
                email: params.email,
                emailSubscription: params.emailSubscription
            }
            state.collections = params.collections
        }

    },

    actions: {

        handleLogin: ({state, commit})=> {
            commit('login')
        },

        handleLogout: ({state, commit})=> {
            commit('logout')
        },

        handleSetUser: ({state, commit}, params)=> {
            commit('setUser', params)
        },

    }

})

export default store
