<template>

</template>

<script>
import gql from 'graphql-tag'

const userQuery = gql`
  query {
    user {
      id
      firstName
      lastName
      emailAddress
    }
  }
`
export default {

    created() {

            // Mutation
            this.$apollo.query({
                query: userQuery,
            }).then((response) => {
                // Result
                console.log(response)
                // redirect if user is logged in or did not finish Auth0 Lock dialog
                if (response.data.user.id ||  window.localStorage.getItem('auth0IdToken') === null) {
                    console.warn('not a new user or already logged in')
                    console.log(response)
                    this.$router.push({ name: 'Collections' })
                    location.reload()
                } 
            }).catch((error) => {
                // Error
                console.error(error)
                this.$router.push({ name: 'CreateUser'})
            })

    },

    apollo: {
        user: {
            fetchPolicy: 'network-only',
            query: userQuery,
        },
    }
}
</script>

