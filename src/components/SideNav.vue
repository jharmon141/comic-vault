<template>
    <div>
        <aside class="menu">
            <p class="menu-label">
            Add Comics
            </p>
            <ul class="menu-list">
                <router-link to="/search" tag="li"><a>Search</a></router-link>
                <router-link to="/manual" tag="li"><a>Add Manual</a></router-link>
            </ul>
            <p class="menu-label">
            <router-link to="/collections">Collections</router-link>
            </p>
            <ul class="menu-list">
                <li><router-link to="/collection/all"><a>All</a></router-link></li>
                <li>
                    <ul>
                        <li class="collections" v-for="collection in collections">
                            <router-link :to="collection.path"><a>{{collection.name}}</a></router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    </div>
</template>

    
<script>
import store from '@/store/index.js'

export default {
    store,
    data: () => ({
        navUrls: [],
    }),
    computed: {
        collections() {
            return this.$store.state.collections.filter(obj => {
                return obj.name.toLowerCase() !== "all"
            })
        },
    },

    mounted(){
        console.log(this.$route.params)
    }
        
}

</script>

<style scoped>

aside {
    margin-left: 10px;

}

.menu-list a:hover{
    color: #fe0000;
}

.menu-list {
    margin-bottom: 50px;
}

.collections a {
    padding: 5px;
}

.menu-label {
    margin-top: 10px;
}

.menu-label a {
    color: #7a7a7a;
}

.menu-label a:hover{
    color: #fe0000;
}

</style>
<style src="bulma/css/bulma.css"></style>
