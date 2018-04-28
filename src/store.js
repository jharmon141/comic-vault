import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },

  getters: {
    authenticated: state => {
      return !!state.user.id && !!state.user.name && !!state.user.email
    }
  },

  mutations: {
    signinUser: (state, params) => {
      state.user = Object.assign({}, params)
    },

    logoutUser: (state) => {
      state.user = Object.assign({})
    }
  },

  actions: {
    handleSigninUser: ({ commit }, params) => {
      commit('signinUser', params)
    },

    handleLogoutUser: ({ commit }) => {
      commit('logoutUser')
    }
  }
})