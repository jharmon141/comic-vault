<template>
    <div>

        <div v-for="comic in comics" class="comicList">

            <list-comic :collection="collection" :comic="comic"></list-comic>

        </div>

    </div>

</template>

<script>
import gql from 'graphql-tag'
import ListComic from './ListComic.vue'

const deleteComic = gql`
    mutation($id: ID!) {
         deleteComic(id: $id){
             id
        }
    }
`

const deleteCollectionOnComic = gql`
    mutation($comicId: ID!, $collectionId: ID!){
        removeFromCollectionOnComic(comicsComicId: $comicId, collectionsCollectionId: $collectionId){
            comicsComic{
                id
            }
            collectionsCollection{
                id
            }
        }
    }
`
export default {
    props:{
        comics:'', 
        collection: '',
    },
    
    components: {
        "list-comic": ListComic
    },

    methods: {
        viewThumbView(){
             this.$parent.toggleView("thumbs")
        },

        delete(comic) {
            if (this.collection.name === "All"){

            let id = comic.id

            // Mutation
            this.$apollo.mutate({
                mutation: deleteComic,
                variables: {
                    id
                },
            }).then((data) => {
                window.localStorage.setItem("Snackbar", true)
                window.localStorage.setItem("snackMessage", "Comic deleted")
                this.$router.push({ path: '/' })
                location.reload()
            }).catch((error) => {
                console.error(error)
            })

            } else {

                let comicId = comic.id
                let collectionId = this.collection.id

                this.$apollo.mutate({
                    mutation: deleteCollectionOnComic,
                    variables: {
                        comicId,
                        collectionId
                    },
                }).then((data) => {
                    window.localStorage.setItem("Snackbar", true)
                    window.localStorage.setItem("snackMessage", "Comic removed from collection")
                    location.reload()
                    this.$router.push({ path: '/' });
                }).catch((error) => {
                    console.error(error)
                })
            }
        },

    }

}

</script>

<style scoped>

</style>
