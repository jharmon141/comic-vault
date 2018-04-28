<template>
  <v-app>

    <NavBar v-on:toggleNav="toggleNav"
      v-on:logout="logout" />

    <v-navigation-drawer clipped
      v-model="navDrawer"
      app>
    </v-navigation-drawer>

    <v-content app>
      <router-view />
    </v-content>

  </v-app>
</template>


<script>
import NavBar from '@/components/NavBar.vue'
import { USER_QUERY } from '@/graphql/queries.js'

export default {
  name: 'App',
  components: {
    NavBar
  },

  data: () => ({
    navDrawer: false,
    user: null,
    loading: 0
  }),

  watch: {
    user: function (newUser) {
      const user = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }

      this.$store.dispatch('handleSigninUser', user)
    }
  },

  computed: {
    authenticated() {
      return this.$store.getters.authenticated
    }
  },

  apollo: {
    user: {
      query: USER_QUERY,
      loadingKey: 'loading'
    }
  },

  methods: {
    toggleNav() {
      this.navDrawer = !this.navDrawer
    },

    logout() {
      localStorage.removeItem('comicvault-auth-token')
      this.$store.dispatch('handleLogoutUser')
      this.$router.push('/')
    }

  }
}
</script>


<style lang="scss">
.toolbar__content {
  color: white;
  img {
    margin-left: 0 !important;
  }
}

#nav-icon {
  height: 56px;
  cursor: pointer;
}

html {
  width: 100%;
}
</style>