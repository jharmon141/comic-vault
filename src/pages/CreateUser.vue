<template>

    <div class="createUser">
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
            <li>Yes<input type="radio" id="Yes" value=true v-model="emailSubscription"></li>
            <li>No<input type="radio" id="No" value=false v-model="emailSubscription"></li>
        </ul>
        <span type="submit" class="button" @click="create()">Sign Up</span>
        </form>

    </div>

</template>

<script>
import gql from 'graphql-tag'

const createUser = gql`
  mutation ($idToken: String!, $firstName: String!, $lastName: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, firstName: $firstName, lastName: $lastName, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }
`

export default {

    data: () => ({
        emailSubscription: true,
        user: {}
    }),

    computed: {
        email() {
            let obj = JSON.parse(window.localStorage.profile)
            return obj.email
        },
        firstName() {
            let obj = JSON.parse(window.localStorage.profile)
            return obj.given_name
        },
        lastName() {
            let obj = JSON.parse(window.localStorage.profile)
            return obj.family_name
        }
    },


    methods: {

        create() {

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
                location.reload()
                this.$router.push({ name: 'Collections' });
            }).catch((error) => {
                // Error
                console.error(error)
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
    margin-left: 43%;
}

input {
    margin-bottom: 25px;
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
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

.button {
    width: 100%;
}

input {
    width: 100%;
}

</style>
<style src="bulma/css/bulma.css"></style>
