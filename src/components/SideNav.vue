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
            Archive
            </p>
            <ul class="menu-list">
                <li><router-link to="/collection/all"><a>All</a></router-link></li>
                <li>
                    <p class="menu-label">
                    Collections
                    </p>
                    <ul>
                        <li v-for="collection in collections">
                            <router-link :to="collection.path"><a>{{collection.name}}</a></router-link>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="menu-list">
                <router-link to="/add_collection" tag="li"><a>Add Collection</a></router-link>
            </ul>
            <ul class="menu-list">
                <router-link to="/edit_collection" tag="li"><a>Edit Collection</a></router-link>
            </ul>
        </aside>
    </div>
</template>

    
<script>
import store from '../store/index.js'

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

.menu-label {
    margin-top: 10px;
}

</style>
<style src="bulma/css/bulma.css"></style>
