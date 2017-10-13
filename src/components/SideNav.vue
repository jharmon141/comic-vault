<template>
    <div>
        <div v-if="!auth">
        </div>

        <div v-else>
            <aside :class="{ 'slideOutLeft': fadeOut }"  class="animated slideInLeft menu">
                <p class="menu-label">
                    Add Comics
                </p>
                <ul class="menu-list">
                    <SideItem :isCollection="false" text="Search" path="/search" ></SideItem>
                    <SideItem :isCollection="false" text="Manual Add" path="/new" ></SideItem>
                </ul>
                <p class="menu-label">
                    Collections
                </p>
                <ul class="menu-list">
                    <li><SideItem  :isCollection="true" :collection="all" text="All" path="/collection/all" ></SideItem></li>
                    <li>
                        <ul class="menu-list">
                            <SideItem v-for="collection in collections" :key="collection.id" class="collections" :isCollection="true" :collection="collection" :text="collection.name" :path="collection.path" ></SideItem>
                        </ul>
                    </li>
                    <li><SideItem  :isCollection="false" text="Manage Collections" path="/collections" ></SideItem></li>
                </ul>
            </aside>
        </div>
    </div>
</template>


<script>
import store from '@/store/index.js'
import SideItem from './SideItem.vue'

export default {
    store,

    data: () => ({
        navUrls: [],
        fadeOut: false
    }),

    components: {
        'SideItem': SideItem
    },

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

    beforeDestroy() {
        setTimeout(1000)
        this.fadeOut = true
    }
}

</script>

<style scoped>

aside {
    margin-left: 15px;
    margin-top: 110px;
    position: fixed;
    overflow-y: auto;
    top: 10px;
    bottom: 10px;
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

</style>
<style src="bulma/css/bulma.css"></style>
