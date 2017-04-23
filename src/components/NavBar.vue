<template>
    <div>
        <nav class="nav has-shadow">
            <div class="container">
                <div class="nav-left">
                    <a class="nav-item">
                        Comic Vault
                    </a>
                </div>
                <span @click="toggleMenu" class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div class="nav-right nav-menu" :class="menuActive">
                    <a class="nav-item is-tab">
                        Profile
                    </a>
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
export default {

    data: () => ({
        menuActive: '',
    }),


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

.nav {
    background-color: #fe0000;
    font-weight: 500;
    margin-bottom: 75px;
    height: 50px;
}

.nav-item {
    color: #f9f4f4;
    font-size: 18px;
}

.nav-item a.is-tab:hover, a.nav-item.is-tab:hover{
    border-bottom-color: whitesmoke;
    border-width: 3px;
    background-color: whitesmoke;
    color: #00A7E1;
}
.nav-item a:hover, a.nav-item:hover{
    color: #61caef;
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
    height: 50px;
    width: 50px;
}
</style>

<style src="bulma/css/bulma.css"></style>
