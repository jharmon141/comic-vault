import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

// connect to GraphQL project
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj1soroyb3hyf019346x05jju',
})


// use the auth0IdToken in localStorage for authorized requests
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
    }
    next()
  },
}])


const apolloClient = new ApolloClient({
  networkInterface,
})

// Install the vue plugin
Vue.use(VueApollo, {
  apolloClient,
})


// Start the app
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
