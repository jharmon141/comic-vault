<template>
  <div>
    <nav id="nav" class="nav has-shadow">

      <div class="nav-left">

        <router-link to="/">
          <img src="../assets/comicvault_icon.png">
        </router-link>

        <router-link to="/">
            <a :class="{ 'active': landingActive } " 
                class="nav-item is-tab">
            Comic Vault
          </a>
        </router-link>
      </div>

      <span 
          @click="toggleMenu" 
          class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div 
          class="nav-right nav-menu" 
          :class="menuActive">

          <router-link  
              v-if="authenticated" 
              :key="$route.path" 
              to="/profile" 
              tag="img" 
              :src="userPic" 
              class="userImg">
          </router-link>

          <router-link  
              v-if="authenticated" 
              :key="$route.path" 
              to="/profile">
              <a :class="{ 'active': profileActive } "class="nav-item is-tab">
                  {{firstName}}
              </a>
          </router-link>

        <a class="nav-item is-tab">
          <login></login>
        </a>
      </div>

    </nav>
  </div>
</template>

<script>
import LoginAuth0 from '../components/LoginAuth0.vue'
import store from '@/store/index.js'

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
        },
        profileActive(){
            return this.$route.path === '/profile'
        },
        landingActive(){
            return this.$route.path === '/' && this.authenticated
        },
        loginActive(){
            return this.$store.state.authenticated === false
        },
        userPic(){
            if (window.localStorage.profile) {
                let temp = JSON.parse(window.localStorage.profile)
                return temp.picture
            } else {
                return "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png"
            }
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
  height: 50px;
}

.userImg {
  border-radius: 50%;
  margin-right: 17px;
  cursor: pointer;
  height: 35px;
  margin-top: 7.5px;
}

.nav {
  background-color: #D9D9D9;
  font-weight: 500;
  margin-bottom: 75px;
  height: 64px;
  position: fixed;
  padding-top: 13px;
  width: 100%;
}

.nav-left {
  overflow: inherit;
}

.nav-item {
  color: white;
  font-size: 18px;
  padding-top: 10px;
}

a.nav-item.active {
  border-bottom-color: #1E90FF;
  border-width: 3px;
  color: #fe0000;
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
  padding-right: 5px;
  margin: 0;
}

@media screen and (max-width: 768px){
  .nav-menu {
    background-color: slategrey;
  }
}

@media screen and (max-width: 768px) {
  .nav-menu.nav-right {
    background-color: slategrey;
  }
}

.nav-toggle {
  height: 50px;
  width: 50px;
}
</style>
