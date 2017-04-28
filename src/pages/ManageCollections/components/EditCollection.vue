<template>

    <div class="editCollection">
        <h1>Edit Collections:</h1>
        
        <div v-for="collection in collections">
            <updateCollection :collection="collection"></updateCollection>
        </div>
    </div>

</template>

<script>
import gql from 'graphql-tag'
import store from '@/store/index.js'
import UpdateCollection from './UpdateCollection'

const updateCollection = gql`
    mutation($collectionId: ID, $name: String!, $path: String!){
        createCollection(name: $name, userId: $userId, path: $path){
            id
        }
    }
`

export default {

    components: {
        'updateCollection': UpdateCollection,
    },

    data: () => ({
    }),

    computed: {

        collections() {
            return this.$store.state.collections.filter((obj) => {
                return obj.name !== "All"
            })
        },

    },

    methods: {

        submitUpdateCollection() {

            let name = this.name 
            let collectionId = this.collectionId 
            let path = getUrlParams(name) 

            // Mutation
            this.$apollo.mutate({
                mutation: updateCollection,
                variables: {
                    name,
                    userId,
                    path
                },
            }).then((data) => {
                window.localStorage.setItem("Snackbar", true)
                window.localStorage.setItem("snackMessage", "Collection Updated")
                location.reload()
                this.$router.push({ path: '/collections/all' });
            }).catch((error) => {
                console.error(error)
            })
        },

        submitDeleteCollection() {

            let name = this.name 
            let userId = this.userId

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
                window.localStorage.setItem("snackMessage", "Collection Added")
                location.reload()
                this.$router.push({ path: '/collections/all' });
            }).catch((error) => {
                console.error(error)
            })
        },
    },

    methods: {
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
}

input {
    width: 100%;
}

</style>
<style src="bulma/css/bulma.css"></style>

