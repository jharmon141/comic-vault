<template>
    <div>
        <div v-if="!auth">
        </div>

        <div v-else>
        <aside class="menu">
            <p class="menu-label">
            Add Comics
            </p>
            <ul class="menu-list">
                <router-link to="/search" tag="li"><a>Search</a></router-link>
                <router-link to="/new" tag="li"><a>Manual Add</a></router-link>
            </ul>
            <p class="menu-label">
            <router-link to="/collections">Collections</router-link>
            </p>
            <ul class="menu-list">
                <li><router-link to="/collection/all"><a>All ({{all.comics.length}})</a></router-link></li>
                <li>
                    <ul>
                        <li class="collections" v-for="collection in collections">
                            <router-link :to="collection.path"><a>{{collection.name}} ({{collection.comics.length}})</a></router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
        </div>
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
        auth() {
            return this.$store.state.authenticated
        },
        all() {
            return this.$store.state.collections.find(obj => {
                return obj.name === "All"
            })
        }
    },
}

</script>

<style scoped>

aside {
    margin-left: 10px;
    margin-top: 100px;
    position: fixed;
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

.menu-label a {
    color: #7a7a7a;
}

.menu-label a:hover{
    color: #fe0000;
}

</style>
<style src="bulma/css/bulma.css"></style>
