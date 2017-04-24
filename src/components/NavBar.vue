<template>
    <div>
        <nav class="nav has-shadow">
            <div class="container">
                <div class="nav-left">
                    <router-link to="/">
                    <img src="../assets/comicvault_icon.png">
                    </router-link>
                    <router-link to="/">
                    <a class="nav-item is-tab">
                        Comic Vault
                    </a>
                    </router-link>
                </div>
                <span @click="toggleMenu" class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div class="nav-right nav-menu" :class="menuActive">
                    <router-link to="/profile"><a class="nav-item is-tab" v-if="authenticated">{{firstName}}</a></router-link>
                    <a class="nav-item is-tab">
                        <login></login>
                    </a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import LoginAuth0 from '../components/LoginAuth0.vue'
import store from '../store/index.js'

export default {

    data: () => ({
        menuActive: '',
    }),

    computed: {
        firstName(){
            return this.$store.state.user.firstName
        },
        authenticated(){
            return this.$store.state.authenticated
        }
    },

    components: {
        'login': LoginAuth0,
    },

    methods: {
        
        toggleMenu() {
            if (this.menuActive === '') {
                this.menuActive = 'is-active'
            } else {
                this.menuActive = ''
            }
        }
    }

}
</script>

<style scoped>

img {
    height: 60px;
}

.nav {
    background-color: #c3c3c3;
    font-weight: 500;
    margin-bottom: 75px;
    height: 60px;
}

.nav-item {
    color: white;
    font-size: 18px;
    padding-top: 10px;
}

.is-tab {
    height: 100%;
}

.nav-item a.is-tab:hover, a.nav-item.is-tab:hover{
    border-bottom-color: #1E90FF;
    border-width: 3px;
    color: #fe0000;
}

.container{
    width: 100%;
    padding-left: 5px;
}

@media screen and (max-width: 768px){
    .nav-menu {
        background-color: slategrey;
    }
}

.nav-toggle {
    height: 60px;
    width: 60px;
}
</style>

<style src="bulma/css/bulma.css"></style>
