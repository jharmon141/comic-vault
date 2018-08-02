<template>
    <div id="profile">
        <v-container>
            <v-icon>person</v-icon>
            <v-form ref="updateUserForm" lazy-validation>
                <v-text-field label="First Name" v-model="updateFirstName" @keyup.enter="updateUser"></v-text-field>
                <v-text-field label="Last Name" v-model="updateLastName" @keyup.enter="updateUser"></v-text-field>
                <v-text-field label="Username" v-model="updateUsername" @keyup.enter="updateUser"></v-text-field>
                <v-btn v-if="!loading" @click="updateUser" class="dialogButton" color="red" block>
                    Submit
                </v-btn>

                <v-btn v-else class="dialogButton" color="red" loading block>
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>


<script>
import { UPDATE_USER_MUTATION } from "@/graphql/mutations.js";

export default {
  name: "UserProfile",
  data: () => ({
    loading: false,
    updateFirstName: "",
    updateLastName: "",
    updateUsername: "",
    updateEmail: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Must be valid e-mail address"
    ]
  }),

  mounted() {
    this.updateFirstName = this.$store.state.user.firstName;
    this.updateLastName = this.$store.state.user.lastName;
    this.updateUsername = this.$store.state.user.username;
  },

  methods: {
    updateUser() {
      this.loading = true;

      let id = this.$store.state.user.id;
      let firstName = this.updateFirstName;
      let lastName = this.updateLastName;
      let username = this.updateUsername;

      this.$apollo
        .mutate({
          mutation: UPDATE_USER_MUTATION,
          variables: {
            id,
            firstName,
            lastName,
            username
          }
        })
        .then(payload => {
          let user = {
            id: payload.data.updateUser.id,
            firstName: payload.data.updateUser.firstName,
            lastName: payload.data.updateUser.lastName,
            username: payload.data.updateUser.username,
            profilePic: payload.data.updateUser.profilePic,
            email: payload.data.updateUser.email
          };

          this.$store.dispatch("handleUpdateUser", user);
          this.loading = false;
          this.$swal({
            type: "success",
            title: "Success!",
            text: "Your user information has been updated!",
            timer: 2000
          });
        });
    }
  }
};
</script>


<style>
#profile .icon {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  font-size: 200px;
}
</style>