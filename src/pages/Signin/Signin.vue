<template>

  <div>

    <loading></loading>

  </div>

</template>

<script>
import gql from 'graphql-tag'
import Loading from '../../components/Loading.vue'

const userQuery = gql`
  query {
    user {
      id
      firstName
      lastName
      emailAddress
      emailSubscription
      collections(orderBy: name_ASC ) {
            name
            id
            path
            comics {
                title
            }
        }
    }
  }
`
export default {

  name: 'SignIn',

  components: {
    'loading': Loading,
  },

  apollo: {
    user: {
      query: userQuery,
      forceFetch: true
    },
  },

  methods: {
    queryUser(){

      this.$apollo.query({
        query: userQuery
      }).then((response) => {
        // Result
        console.log(response.data.user.id)
        // redirect if user is logged in or did not finish Auth0 Lock dialog
        if (response.data.user.id ||  window.localStorage.getItem('auth0IdToken') !== null) {
          console.warn('not a new user or already logged in')
          this.$router.push({ name: 'LandingPage' })
          location.reload()
        } 
      }).catch((error) => {
        // Error
        console.error(error)
        this.$router.push({ name: 'CreateUser'})
      })
    }

  },

  created() {
    setTimeout(this.queryUser, 1000)
  }

}
</script>

