<template>
    <div class="login">

        <div v-if="authenticated" class="loginButton">
            <span @click="login()" class="loginText">Log in with Auth0</span>
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
        lock: new Auth0Lock('iBYFD3fZpwKmvINx4Spwm1zjP5M137QH', 'jharmon141.auth0.com', {
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

.login {
    width: 130px;
    height: 46px;
    cursor: pointer;
    background-color: blue;
    color: white;
}

.loginText {
    font-size: 18px;
    display: inline-block;
    vertical-align: center;
}

</style>
