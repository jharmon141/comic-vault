<template>

    <div class="animated slideInDown createUser">
        <template v-if="loadingStatus">
            <loading></loading>
        </template>

        <template v-else>
            <h1>Create a Profile:</h1>
            <form>
                <input v-model="firstName" placeholder="First Name" required>
                <br>
                <input v-model="lastName" placeholder="Last Name" required>
                <br>
                <input v-model="email" placeholder="E-mail Address" required>
                <br>
                <span>Subscribe to email notifications?</span>
                <br>

                <ul class="checkBox">
                    <li>Yes<input type="radio" id="Yes" :value=true v-model="emailSubscription"></li>
                    <li>No<input type="radio" id="No" :value=false v-model="emailSubscription"></li>
                </ul>
                <span type="submit" class="button is-outlined is-danger" @click="create()">Sign Up</span>
            </form>
        </template>

    </div>

</template>

<script>
import gql from 'graphql-tag'
import Loading from '../../components/Loading.vue'

const createUser = gql`
  mutation ($idToken: String!, $firstName: String!, $lastName: String!, $emailAddress: String!, $emailSubscription: Boolean!){
createUser(authProvider: {auth0: {idToken: $idToken}}, firstName: $firstName, lastName: $lastName, emailAddress: $emailAddress, emailSubscription: $emailSubscription, collections: {name: "All", path: "/collection/all"}) {
      id
    }
  }
`

export default {

    name: 'CreateUser',

    data: () => ({
        emailSubscription: true,
        user: {},
        email: '',
        firstName: '',
        lastName: '',
        loadingStatus: false
    }),

    components: {
        'loading': Loading
    },

    created() {
        if (window.localStorage.profile){
            let obj = JSON.parse(window.localStorage.profile)
            this.email = obj.email
            this.firstName = obj.given_name
            this.lastName = obj.family_name
        }
    },

    methods: {

        create() {
            this.loadingStatus = true

            let idToken = window.localStorage.getItem('auth0IdToken')
            let emailAddress = this.email
            let firstName = this.firstName
            let lastName = this.lastName
            let emailSubscription = this.emailSubscription

            // Mutation
            this.$apollo.mutate({
                mutation: createUser,
                variables: {
                    idToken,
                    emailAddress,
                    firstName,
                    lastName,
                    emailSubscription,
                },
            }).then((data) => {
                // Result
                this.$router.push({ path: '/' })
                location.reload()
            }).catch((error) => {
                // Error
                console.error(error)
                alert(error)
                this.loadingStatus = false
            })
        },
    },


}
</script>

<style scoped>

.createUser {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 67%;
}

input {
    margin-bottom: 25px;
    height: 50px;
    font-size: 18px;
}

h1 {
    font-size: 24px;
    margin-bottom: 50px;
    margin-top: 10px;
}

li {
    float: left;
    margin-right: 10px;
}

ul {
    overflow: hidden;
}
.button:hover, .button.is-hovered {
    background-color: #fe0000;
    color: whitesmoke;
}

.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus{
    background-color: #fe0000;
}

.button.is-danger.is-outlined{
    border-color: #fe0000;
    color: #fe0000;
}
.button {
    width: 100%;
    height: 50px;
    font-size: 20px;
}

input {
    width: 100%;
}

</style>
<style src="bulma/css/bulma.css"></style>
