<template>
    <div class="login">

        <div v-if="authenticated" class="loginButton">
            <span @click="showLogin()" class="loginText">Sign In</span>
        </div>

        <div v-else class="logoutButton">
            <span @click="logout() "class="logoutText">Logout</span>
        </div>

    </div>
</template>


<script>
import Auth0Lock from 'auth0-lock'

export default {

    data: () => ({
        user: {},
        lock: new Auth0Lock('bOxcfixTEt32BhOrP4Wk5lywFo4r9rV7', 'jharmon141.auth0.com', {
            auth: {
                responseType: 'token',
            }
        }),
    }),

    computed: {
        authenticated () {
            return this.$store.state.authenticated
        }
    },

    methods: {

        showLogin() {
            this.lock.show()
        },
        logout(){
            // To log out, we just need to remove the token and profile
            // from local storage
            localStorage.removeItem('auth0IdToken')
            localStorage.removeItem('profile')
            this.authenticated = false
            this.user = {}

        }
    },

    mounted() {
        //check for authentication on mount
        this.lock.on('authenticated', (authResult) => {
            window.localStorage.setItem('auth0IdToken', authResult.idToken)
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    // Handle error
                    return
                }
                // Set the token and user profile in local storage
                localStorage.setItem('profile', JSON.stringify(profile))
            })
            this.$router.push({ name: 'Signin' });
        })
        this.lock.on('authorization_error', (error) => {
            // handle error when authorizaton fails
        })
    },
}

</script>


<style>


</style>
