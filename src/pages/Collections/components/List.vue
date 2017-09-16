<template>
    <div>
        <list-comic v-for="comic in comics" 
           :key="comic.id" 
           :handleDelete="handleDelete" 
           :collection="collection" 
           :comic="comic">
        </list-comic>
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
    name: 'list',
    props: ['setLoading', 'comics', 'collection'],
    components: {
        "list-comic": ListComic
    },

    methods: {
        handleDelete(comic) {
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
                    updateQueries: {
                        currectCollection: (prev, { mutationResult }) => {
                            return {
                                currectCollection: prev.allArticles.filter(( obj )=> {
                                    return obj.id !== mutationResult.data.deleteArticle.id;
                                })
                            }
                        }
                    }
                }).then((data) => {
                    window.localStorage.setItem("Snackbar", true)
                    window.localStorage.setItem("snackMessage", "Comic removed from collection")
                    location.reload()
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
