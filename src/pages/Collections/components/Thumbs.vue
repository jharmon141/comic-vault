<template>
    <div>
        <div class="tabs is-toggle">
            <ul>
                <li @click="viewListView()">
                    <a>
                        <v-icon>list</v-icon>
                    </a>
                </li>
                <li class="is-active">
                    <a>
                        <v-icon>view_module</v-icon>
                    </a>
                </li>
            </ul>
        </div>

        <div class="columns">
            <div class="column is-12">

                <div v-for="comic in comics" class="comicList">

                    <thumb-comic :comic="comic"></thumb-comic>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
import ThumbComic from './ThumbComic.vue'

export default {
    props:{
        comics: []
    },

    components: {
        'thumb-comic': ThumbComic
    },

    methods: {
        viewListView(){
            this.$parent.toggleView("list")
        }
    }

}

</script>

<style scoped>
.tabs {
    margin-left: 28%;
}

.tabs.is-toggle{
    margin-bottom: 75px;
}

.tabs.is-toggle li:first-child a{
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

.is-10 {
    margin-left: 0px;
}

</style>
