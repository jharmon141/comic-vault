<template>
    <div class="collections">

        <template v-if="loadingStatus">
            <loading></loading>
        </template>

        <template v-else>
            <h1>Collection: {{collection.name}}</h1>
            <list :collection="collection" :comics="comics" v-if="viewType === 'list'"></list>
            <thumbs :comics="comics" v-else-if="viewType === 'thumbs'"></thumbs>
        </template>

    </div>
</template>

<script>
import store from '@/store/index.js'
import gql from 'graphql-tag'
import Thumbs from './components/Thumbs'
import List from './components/List'
import Loading from '../../components/Loading.vue'

const collectionQuery = gql`
query($id: ID) {
    Collection (id: $id) {
      name
      comics (orderBy: series_ASC) {
            id
            title
            series
            artUrl
            artist
            description
            pubYear
            publisher
            writer
            issueNumber
        }
    }
  }
`

export default {
    store,
    components: {
        'thumbs': Thumbs,
        'list': List,
        'loading': Loading
    },
    data: () => ({
        comics: [],
        viewType: "list",
        loadingStatus: false
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
            this.loadingStatus = true
            let id = this.collection.id
            this.$apollo.query({
                query: collectionQuery,
                variables:{
                    id
                }
            }).then((response) => {
                this.comics = response.data.Collection.comics
                this.loadingStatus = false
            }).catch((error) => {
                // Error
                console.error(error)
                this.loadingStatus = false
            })
        },

        toggleView(newViewType){
             this.viewType = newViewType
        }

    },

    created() {
        this.queryCollection()
    }

}
</script>

<style scoped>

.collections{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 75%;
}

h1 {
    font-size: 24px;
    margin-bottom: 50px;
    margin-top: 10px;
}

img {
    cursor: pointer;
}
</style>

