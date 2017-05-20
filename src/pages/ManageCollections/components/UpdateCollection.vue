<template>

    <div class="updateCollection">
            <input v-model="updateName" placeholder="New Name" required>
            <span @click="updateCollection()" class="button edit is-outlined">
                <v-icon>edit</v-icon>
            </span>
            <span @click="deleteCollection()" class="button is-danger is-outlined">
                <v-icon>delete</v-icon>
            </span>
            <br>

    </div>

</template>

<script>
import gql from 'graphql-tag'
import store from '@/store/index.js'

const updateCollection = gql`
    mutation($id: ID!, $name: String! $path: String!){
        updateCollection(id: $id, name: $name, path: $path){
            id
        }
    }
`

const deleteCollection = gql`
    mutation($id: ID!) {
         deleteCollection(id: $id){
             id
        }
    }
`

export default {

    props: ['collection'],

    data: () => ({
        updateName: '',
    }),

    mounted() {
        this.updateName = this.collection.name
    },

    methods: {

        updateCollection() {

            let name = this.updateName 
            let id = this.collection.id 
            let path = this.getUrlParams(name) 

            // Mutation
            this.$apollo.mutate({
                mutation: updateCollection,
                variables: {
                    name,
                    id,
                    path
                },
            }).then((data) => {
                window.localStorage.setItem("Snackbar", true)
                window.localStorage.setItem("snackMessage", "Collection updated")
                this.$router.push({ path: '/' })
                location.reload()
            }).catch((error) => {
                console.error(error)
            })
        },

        deleteCollection() {

            let id = this.collection.id

            // Mutation
            this.$apollo.mutate({
                mutation: deleteCollection,
                variables: {
                    id
                },
            }).then((data) => {
                window.localStorage.setItem("Snackbar", true)
                window.localStorage.setItem("snackMessage", "Collection deleted")
                this.$router.push({ path: '/' })
                location.reload()
            }).catch((error) => {
                console.error(error)
            })
        },

        getUrlParams(name) {
            let basePath = "/collection/"
            let lowerName = name.toLowerCase()
            let params =  lowerName.replace(/\s/g, '+')
            return basePath + params
        }
    }

}
</script>

<style scoped>

.editCollection {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 67%;
}

input {
    height: 50px;
    font-size: 18px;
    width: 75%;
    float: left;
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

.button.edit.is-outlined{
    border-color: #1E90FF;
    color: #1E90FF;
    float: left;
}

.button.edit.is-outlined:hover, .button.edit.is-outlined:focus{
    background-color: #1E90FF;
    color: white;
}

.button {
    width: 12.5%;
    height: 50px;
    font-size: 20px;
    margin-bottom: 25px;
}


</style>
<style src="bulma/css/bulma.css"></style>
