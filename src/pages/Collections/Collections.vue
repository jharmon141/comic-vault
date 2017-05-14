<template>
    <div class="collections">

        <template v-if="loadingStatus">
            <loading></loading>
        </template>

        <template  v-else>
            <h1>Collection: {{collection.name}} </h1>
            <div class="tabs is-toggle">
                <ul class="tabList">
                    <li :class="{ 'is-active': listView }" @click="toggleView()">
                        <a>
                            <v-icon>list</v-icon>
                        </a>
                    </li>
                    <li :class="{ 'is-active': thumbView }" @click="toggleView()">
                        <a >
                            <v-icon>view_module</v-icon>
                        </a>
                    </li>
                </ul>
            </div>

            <transition name="slide-fade"  mode="out-in">
            <keep-alive>
                <list :collection="collection" :comics="comics" v-if="listView"></list>
                <thumbs :comics="comics" v-if="thumbView"></thumbs>
            </keep-alive>
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

    name: 'Collections',

    components: {
        'thumbs': Thumbs,
        'list': List,
        'loading': Loading
    },

    data: () => ({
        comics: [],
        viewType: "list",
        loadingStatus: false,
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

        toggleView(){
            if (this.listView) {
                this.listView = false
                this.thumbView = true
            } else {
                this.listView = true
                this.thumbView = false
            }
        }

    },

    beforeMount() {
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

.tabs {
    margin-left: 28%;
}

.tabs.is-toggle{
    margin-bottom: 100px;
}

.tabs.is-toggle li a{
    border-color: #fe0000;
    color: #fe0000;
}

.tabs.is-toggle li.is-active a{
    border-color: #fe0000;
    background-color: #fe0000;
    color: white;
}

.tabs li {
    width: 20%;
}

v-icon {
    margin-left: 0px;
}

.tabs.is-toggle a:hover{
    background-color: white;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
