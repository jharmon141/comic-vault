<template>
    <div>
        <div class="tabs is-toggle">
            <ul>
                <li class="is-active">
                    <a>
                        <v-icon>list</v-icon>
                    </a>
                </li>
                <li @click="viewThumbView()">
                    <a >
                        <v-icon>view_module</v-icon>
                    </a>
                </li>
            </ul>
        </div>

        <div v-for="comic in comics" class="comicList">

            <list-comic :comic="comic"></list-comic>

        </div>

    </div>

</template>

<script>
import ListComic from './ListComic.vue'

export default {
    props:{
        comics:'', 
    },
    
    components: {
        "list-comic": ListComic
    },

    methods: {
        viewThumbView(){
             this.$parent.toggleView("thumbs")
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

.tabs.is-toggle li:last-child a{
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

</style>
