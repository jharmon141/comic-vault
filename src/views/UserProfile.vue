<template>
    <div id="profile">
        <v-container>

            <v-icon>person</v-icon>
            <v-dialog v-model="profilePicDialog">
                <p slot="activator" id="imageLink">Change profile image +</p>
                <v-card>
                    <v-card-text>
                        <v-form ref="profilePicLink" lazy-validation>
                            <v-text-field label="Image URL" v-model="profilePicURL" @keyup.enter="updateProfilePic"></v-text-field>

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="!picLoading" @click="updateProfilePic" class="dialogButton" color="blue" block>
                            Submit
                        </v-btn>
                        <v-btn v-else class="dialogButton" color="blue" loading block>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

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

            <v-dialog v-model="updateSuccess" max-width="250">
                <v-card>
                    <v-card-title>
                        Update successful!
                    </v-card-title>

                    <v-card-text>
                        <v-icon color="green">check</v-icon>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue" flat="flat" @click="updateSuccess = false">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-container>
    </div>
</template>


<script>
import { UPDATE_USER_MUTATION, UPDATE_USER_PROFILE_PIC_MUTATION } from "@/graphql/mutations.js";
import { setTimeout } from "timers";

export default {
  name: "UserProfile",
  data: () => ({
    loading: false,
    picLoading: false,
    profilePicDialog: false,
    updateSuccess: false,
    profilePicURL: "",
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
    updateProfilePic() {
      this.loading = true;

      const profilePic = this.profilePicURL;
      const id = this.$store.state.user.id;

      this.$apollo
        .mutate({
          mutation: UPDATE_USER_PROFILE_PIC_MUTATION,
          variables: {
            id,
            profilePic
          }
        })
        .then(payload => {
          const user = {
            id: payload.data.updateUser.id,
            firstName: payload.data.updateUser.firstName,
            lastName: payload.data.updateUser.lastName,
            username: payload.data.updateUser.username,
            profilePic: payload.data.updateUser.profilePic,
            email: payload.data.updateUser.email
          };

          this.$store.dispatch("handleSigninUser", user);
          this.loading = false;

          this.updateSuccess = true;

          setTimeout(
            function() {
              this.updateSuccess = false;
            }.bind(this),
            2000
          );
        });
    },

    updateUser() {
      this.loading = true;

      const id = this.$store.state.user.id;
      const firstName = this.updateFirstName;
      const lastName = this.updateLastName;
      const username = this.updateUsername;

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
          const user = {
            id: payload.data.updateUser.id,
            firstName: payload.data.updateUser.firstName,
            lastName: payload.data.updateUser.lastName,
            username: payload.data.updateUser.username,
            profilePic: payload.data.updateUser.profilePic,
            email: payload.data.updateUser.email
          };

          this.$store.dispatch("handleSigninUser", user);
          this.loading = false;

          this.updateSuccess = true;

          setTimeout(
            function() {
              this.updateSuccess = false;
            }.bind(this),
            2000
          );
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

.card__text .icon {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  font-size: 60px;
}

.dialog__container {
  width: 100%;
}
.dialog__activator #imageLink {
  color: red;
  text-align: center;
  margin-top: -25px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
</style>