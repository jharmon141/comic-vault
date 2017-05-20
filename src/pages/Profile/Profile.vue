<template>

    <div class="animated slideInDown profile">
        <h1>Update Your Profile:</h1>
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
            <span type="submit" class="button is-outlined is-danger" @click="update()">Update</span>
        </form>

    </div>

</template>

<script>
import gql from 'graphql-tag'
import store from '@/store/index.js'

const updateUser = gql`
  mutation ($id: ID!, $firstName: String!, $lastName: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
     id
    }
  }
`

export default {

    name: 'Profile',

    data: () => ({
        emailSubscription: '',
        email: '',
        firstName: '',
        lastName: '',
        id: '',
    }),

    created(){
        this.email = this.$store.state.user.email
        this.firstName = this.$store.state.user.firstName
        this.lastName = this.$store.state.user.lastName
        this.id = this.$store.state.user.id
        this.emailSubscription = this.$store.state.user.emailSubscription
    },


    methods: {

        update() {

            let id = this.id 
            let emailAddress = this.email
            let firstName = this.firstName
            let lastName = this.lastName
            let emailSubscription = this.emailSubscription

            this.$apollo.mutate({
                mutation: updateUser,
                variables: {
                    id,
                    emailAddress,
                    firstName,
                    lastName,
                    emailSubscription,
                },
            }).then((data) => {
                window.localStorage.setItem("Snackbar", true)
                window.localStorage.setItem("snackMessage", "Profile updated")
                this.$router.push({ path: '/' })
                location.reload()
            }).catch((error) => {
                console.error(error)
            })
        },
    },


}
</script>

<style scoped>

.profile {
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

