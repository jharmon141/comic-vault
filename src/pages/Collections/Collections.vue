<template>
    <div class="collections">

        <template v-if="loading">
            <loading></loading>
        </template>

        <template  v-else>
            <h1>Collection: {{collection.name}} </h1>

            <tabs :setListView="setListView" :setThumbView="setThumbView" :thumbView="thumbView" :listView="listView"></tabs>

            <transition name="slide-fade"  mode="out-in">
            <list :setLoading="setLoading" :collection="collection" :comics="comics" v-if="listView && !thumbView"></list>
            <thumbs :comics="comics" v-else-if="thumbView && !listView"></thumbs>
            </transition>

        </template>

    </div>
</template>

<script>
import store from '@/store/index.js'
import gql from 'graphql-tag'
import Thumbs from './components/Thumbs'
import List from './components/List'
import Loading from '../../components/Loading.vue'
import Tabs from './components/Tabs.vue'

const collectionQuery = gql`
query currectCollection($id: ID) {
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
    name: 'Collections',

    components: {
        'thumbs': Thumbs,
        'list': List,
        'loading': Loading,
        'tabs': Tabs
    },

    data: () => ({
        comics: [],
        viewType: 'list',
        loading: false,
        thumbView: false,
        listView: true
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
            this.loading = true
            let id = this.collection.id
            this.$apollo.query({
                query: collectionQuery,
                variables:{
                    id
                }
            }).then((response) => {
                this.comics = response.data.Collection.comics
                this.loading = false
            }).catch((error) => {
                console.error(error)
                this.loading = false
            })
        },

        setListView(){
            this.listView = true
            this.thumbView = false
        },

        setThumbView(){
            this.thumbView = true
            this.listView = false
        },

        setLoading(state){
            this.loading = state
        },

    },

    beforeMount() {
        this.queryCollection()
    },

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

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
