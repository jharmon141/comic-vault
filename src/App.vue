<template>
    <div id="app">
        <NavBar></NavBar>
        <div class="columns">
            <div transition="fadeInRight" v-if="authenticated" class="column is-one-quarter animate fadeRight">
                <SideNav></SideNav>
            </div>
            <div class="column is-two-thirds">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import store from './store/index.js'
import SideNav from './components/SideNav.vue'
import NavBar from './components/NavBar.vue'
import gql from 'graphql-tag'

const userQuery = gql`
  query {
    user {
      id
      firstName
      lastName
      emailAddress
      emailSubscription
    }
  }
`
export default {
    name: 'app',
    store,
    computed: {
        authenticated() {
            return this.$store.state.authenticated
        }
    },

    components: {
        'SideNav': SideNav,
        'NavBar': NavBar,
    },

    apollo: {
        user: {
            fetchPolicy: 'network-only',
            query: userQuery,
        },
    },

    mounted() {

        this.$apollo.query({
            query: userQuery,
        }).then((response) => {
            // Result
            console.log(response)
            let params = {}
            params.id = response.data.user.id
            params.firstName = response.data.user.firstName
            params.lastName = response.data.user.lastName
            params.email = response.data.user.emailAddress
            params.emailSubscription = response.data.user.emailSubscription
            if (response.data.user.id) {
                this.$store.dispatch('handleLogin')
                this.$store.dispatch('handleSetUser',params) 
            }
        })
    }
}
</script>

<style>

.app {
    text-align: center;
    display: flex;
    justify-content: center;

    padding: 12px;
    margin: auto;
}

.column {
    margin: 10px;
}

input:focus {
    box-shadow: none;
    outline: none;
    border-color: #40b883;
}

input {
    padding: 8px;
    border: solid 1px #bbb;
    border-radius: 2px;
}
</style>
<style src="bulma/css/bulma.css"></style>
<style src="vue-animate/dist/vue-animate.min.css"></style>
