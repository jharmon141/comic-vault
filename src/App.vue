<template>
    <div id="app" style="height:100%">

        <template v-if="loadingStatus">
            <loading/>
        </template>

        <template v-else>

            <NavBar/>

            <div style="min-height:100vh" class="columns">
                <div  class="column is-2">
                    <transition name="component-fade" mode="out-in">
                        <SideNav/>
                    </transition>
                </div>
                <div class="column is-10">
                    <main>
                        <keep-alive include="Search,Collections">
                            <router-view :key="$route.path"></router-view>
                        </keep-alive>
                    </main>
                </div>
            </div>

            <footer class="footer">
                <a target="blank" href="https://github.com/jharmon141/comic-vault">
                    <img src="./assets/github_icon.png">
                </a> 
            </footer>

            <v-snackbar 
                :bottom="bottom"
                v-model="snackbar"
                >
                {{snackMessage}} 
                <v-btn flat class="pink--text" @click.native="snackbar = false">OK</v-btn>
            </v-snackbar>

        </template>
    </div>
</template>

<script>
import store from './store/index.js'
import SideNav from './components/SideNav.vue'
import NavBar from './components/NavBar.vue'
import Loading from './components/Loading.vue'
import gql from 'graphql-tag'

const userQuery = gql`
query {
  user {
    id
    firstName
    lastName
    emailAddress
    emailSubscription
    collections(orderBy: name_ASC ) {
name
      id
      path
comics {
    title
}
}
}
}
`

export default {
    name: 'app',
    store,

    data: () => ({
        snackbar: false,
        bottom: true,
        snackMessage: '',
        loadingStatus: false,
    }),

    computed: {
        authenticated() {
            return this.$store.state.authenticated
        }
    },

    components: {
        'SideNav': SideNav,
        'NavBar': NavBar,
        'loading': Loading,
    },

    apollo: {
        user: {
            fetchPolicy: 'network-only',
            query: userQuery,
        },
    },

    methods: {

        toggleSnackbar(message){
            this.snackbar = true
            this.snackMessage = message
            setTimeout(()=> {this.snackbar = false}, 3000)
        },

        queryUser(){
            this.loadingStatus = true
            this.$apollo.query({
                query: userQuery,
            }).then((response) => {

                let params = {}

                params.id = response.data.user.id
                params.firstName = response.data.user.firstName
                params.lastName = response.data.user.lastName
                params.email = response.data.user.emailAddress
                params.emailSubscription = response.data.user.emailSubscription
                params.collections = response.data.user.collections

                this.loadingStatus = false

                let snack = window.localStorage.getItem("Snackbar")
                this.snackMessage = window.localStorage.getItem("snackMessage")

                if (response.data.user.id) {
                    this.$store.dispatch('handleSetUser',params) 
                    this.$store.dispatch('handleLogin')
                }
                if (snack) {
                    this.toggleSnackbar(this.snackMessage)
                    window.localStorage.removeItem("Snackbar")
                    window.localStorage.removeItem("snackMessage")
                }
            }).catch((error) => {
                // Error
                console.error(error)
                this.loadingStatus = false
            })
        }

    },

    created() {
        this.queryUser()
    }

}
</script>

<style>

html {
    position: relative;
    min-height: 100%;
}

body {
    margin: 0 0 195px; /* bottom = footer height */
}

main {
    margin-top: 2%;
    margin-bottom: 5%;
}

footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}

.is-10 {
    margin-left: 5%;
    margin-top: 100px;
}

input:focus {
    box-shadow: none;
    outline: none;
    border-color: #40b883;
}

textarea:focus {
    outline: none;
    box-shadow: none;
    border-color: #40b883 !important;
}

input {
    padding: 8px;
    border: solid 1px #bbb;
    border-radius: 2px;
}

.footer {
    padding: 7px 0px !important;
    padding-top: 7px !important;
    background-color: whitesmoke;
    color: black;
    text-align: center;
    justify-content: center;
}

.footer p {
    background-color: whitesmoke;
}

.footer img {
    width: 30px;
}

.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s;
}

.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for <2.1.8 */ {
opacity: 0;
min-height: 100%;
}

.modal.is-active {
    z-index: 5000 !important;
}
</style>
<style src="bulma/css/bulma.css"></style>
<style src="animate.css/animate.min.css"></style>
