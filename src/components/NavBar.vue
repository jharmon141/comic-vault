<template>
    <div id="navBar">

        <v-toolbar app
            color="grey lighten-2"
            clipped-left>

            <img v-if="!!$store.getters.authenticated"
                @click="$emit('toggleNav')"
                id="nav-icon"
                src="@/assets/comicvault_icon.png">

            <img v-else
                id="nav-icon"
                src="@/assets/comicvault_icon.png">

            <v-toolbar-title @click="$router.push('/')" id="site-title">Comic Vault</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items v-if="!!$store.getters.authenticated">
                <v-menu transition="slide-y-transition"
                    bottom>
                    <v-btn icon
                        slot="activator">
                        <v-icon color="white">person</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile @click="$router.push('/profile')">
                            <v-list-tile-title>
                                {{ $store.state.user.name }}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="$emit('logout')">
                            <v-list-tile-title>Log Out</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>

            <v-toolbar-items v-else>
                <v-btn @click.stop="toggleSigninDialog"
                    flat>Sign In</v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <v-dialog v-model="signinDialog"
            max-width="500px">
            <v-card>
                <v-card-text>
                    <img id="nav-icon-dialog"
                        src="@/assets/comicvault_icon.png">
                    <v-tabs centered
                        color="grey lighten-2"
                        dark
                        slider-color="blue">
                        <v-tab ripple
                            @click="tabSelected='signin'">Sign In</v-tab>
                        <v-tab ripple
                            @click="tabSelected='create'">Create Account</v-tab>

                        <v-tab-item>
                            <v-form ref="signinForm"
                                lazy-validation>
                                <v-text-field label="E-mail"
                                    v-model="signinEmail"
                                    @keyup.enter="submitDialog"
                                    :rules="emailRules"></v-text-field>
                                <v-text-field label="Password"
                                    v-model="signinPassword"
                                    @keyup.enter="submitDialog"
                                    :rules="passwordRules"
                                    type="password"></v-text-field>
                            </v-form>
                        </v-tab-item>

                        <v-tab-item>
                            <v-form ref="createUserForm"
                                lazy-validation>
                                <v-text-field label="Name"
                                    v-model="createName"
                                    @keyup.enter="submitDialog"
                                    :rules="createNameRules"></v-text-field>
                                <v-text-field label="E-mail"
                                    v-model="createEmail"
                                    @keyup.enter="submitDialog"
                                    :rules="emailRules"></v-text-field>
                                <v-text-field label="Password"
                                    type="password"
                                    @keyup.enter="submitDialog"
                                    v-model="createPassword"
                                    :rules="createPasswordRules"></v-text-field>
                                <v-text-field label="Confirm Password"
                                    type="password"
                                    @keyup.enter="submitDialog"
                                    v-model="confirmPassword"
                                    :rules="confirmPasswordRules"></v-text-field>
                            </v-form>
                        </v-tab-item>
                    </v-tabs>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-if="!loading"
                        @click="submitDialog"
                        class="dialogButton"
                        color="red"
                        block>
                        Submit
                    </v-btn>

                    <v-btn v-else
                        class="dialogButton"
                        color="red"
                        loading
                        block>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '@/graphql/mutations.js'

export default {
    name: 'NavBar',

    data: () => ({
        loading: false,
        signinDialog: false,
        signinEmail: '',
        signinPassword: '',
        createEmail: '',
        createPassword: '',
        createName: '',
        confirmPassword: '',
        tabSelected: 'signin',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Must be valid e-mail address'
        ],
        passwordRules: [
            v => !!v || 'Password is required'
        ],
        createNameRules: [
            v => !!v || 'Name is required'
        ],
        createPasswordRules: [
            v => !!v || 'Password is required'
        ]
    }),

    computed: {
        confirmPasswordRules() {
            return [
                v => !!v || 'Must confirm password',
                v => v == this.createPassword || 'Password must match previous entry'
            ]
        }
    },

    methods: {
        toggleSigninDialog() {
            this.signinDialog = !this.signinDialog
        },

        submitDialog() {
            if (this.tabSelected === 'signin' && this.$refs.signinForm.validate()) {
                this.loading = true
                const email = this.signinEmail
                const password = this.signinPassword

                this.$apollo.mutate({
                    mutation: SIGNIN_USER_MUTATION,
                    variables: {
                        email,
                        password
                    }
                }).then((authPayload) => {
                    const user = {
                        id: authPayload.data.signinUser.user.id,
                        name: authPayload.data.signinUser.user.name,
                        email: authPayload.data.signinUser.user.email
                    }

                    localStorage.setItem('comicvault-auth-token', authPayload.data.signinUser.token)
                    this.$store.dispatch('handleSigninUser', user)
                    this.signinPassword = ''
                    this.toggleSigninDialog()
                    this.loading = false
                }).catch((error) => {
                    console.log(error)
                    this.loading = false
                })
            }

            else if (this.tabSelected === 'create' && this.$refs.createUserForm.validate()) {
                this.loading = true
                const name = this.createName
                const email = this.createEmail
                const password = this.createPassword

                this.$apollo.mutate({
                    mutation: CREATE_USER_MUTATION,
                    variables: {
                        name,
                        email,
                        password
                    }
                }).then((authPayload) => {
                    const user = {
                        id: authPayload.data.createUser.id,
                        name: authPayload.data.createUser.name,
                        email: authPayload.data.createUser.email
                    }

                    localStorage.setItem('comcivault-auth-token', authPayload.data.signinUser.token)
                    this.$store.dispatch('handleSigninUser', user)
                    this.createPassword = ''
                    this.confirmPassword = ''
                    this.toggleSigninDialog()
                    this.loading = false
                }).catch((error) => {
                    console.log(error)
                    this.loading = false
                })
            }
        }
    }
}
</script>


<style lang="scss">
#site-title {
    cursor: pointer;
}

.toolbar__content {
  color: white;
  img {
    margin-left: 0 !important;
  }
}

.toolbar__items {
  .btn.btn--flat {
    color: white !important;
  }
}

#nav-icon {
  height: 56px;
  cursor: pointer;
}

#nav-icon-dialog {
  display: block;
  margin: auto;
  margin-bottom: 16px;
}

.dialogButton {
  color: white !important;
}
</style>