import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {

        authenticated:{
            type: Boolean,
            default: false
        },

        user: {
            type: Object,
        }

    },

    mutations: {

        login: ()=> {
            state.authenticated = true
        },

        logout: ()=> {
            state.authenticated = false
        },

        setUser: (params)=> {
            state.user = {
                id: params.id,
                name: params.name,
                email: params.email
            }
        }

    },

    actions: {

        handleLogin: ()=> {
            commit('login')
        },

        handleLogout: ()=> {
            commit('logout')
        }

    },

    getters: {
    }

})

export default store
