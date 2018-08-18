import Vue from "vue";
import App from "./App.vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat } from "apollo-link";
import VueApollo from "vue-apollo";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

Vue.config.productionTip = false;

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHCOOL_URL
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("comicvault-auth-token");

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  });

  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);

new Vue({
  el: "#app",
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
