<template>

    <v-dialog v-model="signinDialogOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar fixed color="grey lighten-1">
            <v-toolbar-title>{{ loginOverpanelTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn @click.native="$emit('toggleSigninDialog')" flat>
                    <v-icon color="white" class="close-icon">close</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card>
            <v-container>
                <v-layout>
                    <v-flex md8 offset-md2>
                        <v-card-text>
                            <img id="nav-icon-dialog" src="@/assets/comicvault.png">
                            <v-tabs centered color="grey lighten-1" dark slider-color="blue">
                                <v-tab ripple @click="tabSelected='signin'">Sign In</v-tab>
                                <v-tab ripple @click="tabSelected='create'">Create Account</v-tab>

                                <v-tab-item>
                                    <v-form ref="signinForm" lazy-validation>
                                        <v-text-field label="E-mail" v-model="signinEmail" @keyup.enter="submitDialog" :rules="emailRules">
                                        </v-text-field>
                                        <v-text-field label="Password" v-model="signinPassword" @keyup.enter="submitDialog" :rules="passwordRules" type="password">
                                        </v-text-field>
                                    </v-form>
                                </v-tab-item>

                                <v-tab-item>
                                    <v-form ref="createUserForm" lazy-validation>
                                        <v-text-field label="First Name" v-model="createFirstName" @keyup.enter="submitDialog">
                                        </v-text-field>
                                        <v-text-field label="Last Name" v-model="createLastName" @keyup.enter="submitDialog">
                                        </v-text-field>
                                        <v-text-field label="E-mail" v-model="createEmail" @keyup.enter="submitDialog" :rules="emailRules" required>
                                        </v-text-field>
                                        <v-text-field label="Password" type="password" @keyup.enter="submitDialog" v-model="createPassword" :rules="createPasswordRules" required>
                                        </v-text-field>
                                        <v-text-field label="Confirm Password" type="password" @keyup.enter="submitDialog" v-model="confirmPassword" :rules="confirmPasswordRules" required>
                                        </v-text-field>
                                    </v-form>
                                </v-tab-item>
                            </v-tabs>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn v-if="!loading" @click="submitDialog" class="dialogButton" color="red" block>
                                Submit
                            </v-btn>

                            <v-btn v-else class="dialogButton" color="red" loading block>
                            </v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>


<script>
import {
    CREATE_USER_MUTATION,
    SIGNIN_USER_MUTATION
} from '@/graphql/mutations.js';

export default {
    name: 'SigninDialog',
    props: {
        signinDialogOpen: Boolean
    },

    data: () => ({
        loading: false,
        signinEmail: '',
        signinPassword: '',
        createEmail: '',
        createPassword: '',
        createFirstName: '',
        createLastName: '',
        confirmPassword: '',
        tabSelected: 'signin',
        emailRules: [
            v => !!v || 'E-mail is required',
            v =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'Must be valid e-mail address'
        ],
        passwordRules: [v => !!v || 'Password is required'],
        createPasswordRules: [v => !!v || 'Password is required']
    }),

    computed: {
        confirmPasswordRules() {
            return [
                v => !!v || 'Must confirm password',
                v =>
                    v == this.createPassword ||
                    'Password must match previous entry'
            ];
        },

        loginOverpanelTitle() {
            if (this.tabSelected === 'signin') {
                return 'SIGN IN';
            } else if (this.tabSelected === 'create') {
                return 'CREATE USER';
            }
        }
    },

    methods: {
        submitDialog() {

            //User sign in API call
            if (
                this.tabSelected === 'signin' &&
                this.$refs.signinForm.validate()
            ) {
                this.loading = true;
                const email = this.signinEmail;
                const password = this.signinPassword;

                this.$apollo
                    .mutate({
                        mutation: SIGNIN_USER_MUTATION,
                        variables: {
                            email,
                            password
                        }
                    })
                    .then(authPayload => {
                        const user = {
                            id: authPayload.data.signinUser.user.id,
                            firstName:
                                authPayload.data.signinUser.user.firstName,
                            lastName: authPayload.data.signinUser.user.lastName,
                            username: authPayload.data.signinUser.user.username,
                            email: authPayload.data.signinUser.user.email,
                            profilePic:
                                authPayload.data.signinUser.user.profilePic
                        };

                        localStorage.setItem(
                            'comicvault-auth-token',
                            authPayload.data.signinUser.token
                        );
                        this.$store.dispatch('handleSigninUser', user);
                        this.signinPassword = '';
                        this.$emit('toggleSigninDialog');
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });

            // Create new user API call
            } else if (
                this.tabSelected === 'create' &&
                this.$refs.createUserForm.validate()
            ) {
                this.loading = true;
                const firstName = this.createFirstName;
                const lastName = this.createLastName;
                const username = this.createUsername;
                const email = this.createEmail;
                const password = this.createPassword;

                this.$apollo
                    .mutate({
                        mutation: CREATE_USER_MUTATION,
                        variables: {
                            firstName,
                            lastName,
                            username,
                            email,
                            password
                        }
                    })
                    .then(authPayload => {
                        const user = {
                            id: authPayload.data.createUser.id,
                            firstName: authPayload.data.createUser.firstName,
                            lastName: authPayload.data.createUser.lastName,
                            username: authPayload.data.createUser.username,
                            email: authPayload.data.createUser.email
                        };

                        localStorage.setItem(
                            'comcivault-auth-token',
                            authPayload.data.signinUser.token
                        );
                        this.$store.dispatch('handleSigninUser', user);
                        this.createPassword = '';
                        this.confirmPassword = '';
                        this.$emit('toggleSigninDialog');
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
            }
        }
    }
};
</script>


<style lang="scss">
#nav-icon-dialog {
    display: block;
    margin: 50px auto 25px auto;
    padding: 25px 0 25px 0;
    height: 250px;
}

.dialogButton {
    color: white !important;
    margin-bottom: 50px !important;
    height: 50px !important;
}

.card {
    padding: 25px 0 0 0;
}

.close-icon {
    font-size: 38px;
}
</style>
