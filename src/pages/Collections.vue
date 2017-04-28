<template>

    <list v-if="viewType === 'list'"></list>
    <thumbs v-else-if="viewType === 'thumbs'"></thumbs>

</template>

<script>
import store from '../store/index.js'
import gql from 'graphql-tag'
import Thumbs from '@/components/Thumbs'
import List from '@/components/Thumbs'

const collectionQuery = gql`
query($id: ID) {
    Collection (id: $id) {
      name
      comics {
            id
            title
            series
            artUrl
            artist
            description
            pubYear
            publisher
            writer
        }
    }
  }
`

export default {
    store,
    components: {
        'thumbs': Thumbs,
        'list': List
    },
    data: () => ({
        comics: [],
        viewType: "list"
    }),
    computed: {
        collection() {
            return  this.$store.state.collections.find(obj => {
                let params = this.$route.params.id.toLowerCase()
                return obj.name.toLowerCase() === params.replace(/\+/g, ' ') 
            })
        }
    },

    methods: {
        queryCollection(){
            let id = this.collection.id
            this.$apollo.query({
                query: collectionQuery,
                variables:{
                    id
                }
            }).then((response) => {
                this.comics = response.data.Collection.comics
            })
        }

    },

    mounted() {
        this.queryCollection()
    }

}
</script>

<style>

</style>

