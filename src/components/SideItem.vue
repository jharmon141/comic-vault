<template>

    <router-link  
        v-if="isCollection" 
        :to="collection.path" 
        tag="li" >
        <a :class="{ 'is-active': active }">
            {{collection.name}} ({{collection.comics.length}})
        </a>
    </router-link>

    <router-link  
        v-else 
        :to="path" 
        tag="li" >
        <a :class="{ 'is-active': active }">
            {{text}}
        </a>
    </router-link>

</template>

<script>
import store from '../store'

export default {
    store,

    props: ['isCollection', 'collection', 'text', 'path'],

    computed: {
        active() {
            return this.path === this.$route.path
        }
    },

}

</script>

<style scoped>

.menu-list a:hover{
    color: #fe0000;
}

.menu-list a.is-active{
    background-color: #fe0000;
    color: white;

}
</style>
