<template>

    <div class="addCollection">
        <h1>Add Collection:</h1>
        <form>
            <input v-model="name" placeholder="Name" required>
            <br>
            <span type="submit" class="button is-outlined is-danger" @click="submit()">Submit</span>
        </form>


    </div>

</template>

<script>
import gql from 'graphql-tag'
import store from '@/store/index.js'

const createCollection = gql`
    mutation($userId: ID, $name: String!, $path: String!){
        createCollection(name: $name, userId: $userId, path: $path){
            id
        }
    }
`

export default {

    data: () => ({
        name: '',
    }),

    computed: {

        userId() {
            return this.$store.state.user.id
        },

        collectionPath(){
            let basePath = "/collection/"
            let name  = this.name.toLowerCase()
            let params = name.replace(/\s/g, '+')
            return basePath + params
        }
    },

    methods: {

        submit() {

            let name = this.name 
            let userId = this.userId
            let path = this.collectionPath

            // Mutation
            this.$apollo.mutate({
                mutation: createCollection,
                variables: {
                    name,
                    userId,
                    path
                },
            }).then((data) => {
                window.localStorage.setItem("Snackbar", true)
                window.localStorage.setItem("snackMessage", "Collection added")
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

.addCollection {
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

textarea {
    height: 300px;
    width: 100%;
    font-size: 18px;
    border: solid 1px #bbb;
    margin-bottom: 25px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    padding: 9px;
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
    margin-bottom: 75px;
}

input {
    width: 100%;
}

</style>
<style src="bulma/css/bulma.css"></style>

