<template>
    <div id="app">
        <NavBar></NavBar>
        <div class="column is-one-quarter">
        <SideNav></SideNav>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import store from './store/index.js'
import SideNav from './components/SideNav.vue'
import NavBar from './components/NavBar.vue'

export default {
    name: 'app',
    components: {
        'SideNav': SideNav,
        'NavBar': NavBar,
    }
}
</script>

<style>

</style>
<style src="bulma/css/bulma.css"></style>
