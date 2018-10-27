<template>
    <div id="navBar">

        <v-toolbar app color="grey lighten-1" clipped-left>

            <img v-if="!!authenticated" @click="$emit('toggleNav')" id="nav-icon" src="@/assets/comicvault_icon.png">
            <img v-else id="nav-icon" src="@/assets/comicvault_icon.png">

            <v-toolbar-title @click="$router.push('/')" id="site-title">Comic Vault</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items v-if="!!authenticated">
                <v-menu transition="slide-y-transition" bottom>
                    <v-btn block flat slot="activator" class="user-btn">
                        <img v-if="user.profilePic" :src="user.profilePic" class="nav-avatar-icon">
                        <v-icon v-else color="white">person</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile @click="$router.push('/profile')">
                            <v-list-tile-title v-if="user.firstName != ''">
                                {{ user.firstName }}
                            </v-list-tile-title>
                            <v-list-tile-title v-else-if="user.username != ''">
                                {{ user.username }}
                            </v-list-tile-title>
                            <v-list-tile-title v-else>
                                {{ user.email }}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="$emit('logout')">
                            <v-list-tile-title>Log Out</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>

            <v-toolbar-items v-else>
                <v-btn @click.stop="toggleSigninDialog" flat>Sign In</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <SigninDialog :signinDialogOpen="signinDialogOpen" v-on:toggleSigninDialog="toggleSigninDialog" />

    </div>
</template>


<script>
import SigninDialog from '@/components/SigninDialog.vue';

export default {
    name: 'NavBar',
    components: {
        SigninDialog
    },

    data: () => ({
        signinDialogOpen: false
    }),

    computed: {
        authenticated() {
            return this.$store.getters.authenticated;
        },

        user() {
            return this.$store.state.user;
        }
    },

    methods: {
        toggleSigninDialog() {
            this.signinDialogOpen = !this.signinDialogOpen;
        }
    }
};
</script>


<style lang="scss">
#site-title {
    cursor: pointer;
}

.toolbar__content {
    color: white;
    img {
        margin-left: 0 !important;
    }
    .btn.btn--flat {
        color: white !important;
        height: auto;
    }
}

.toolbar__items {
    .btn.btn--flat {
        color: white !important;
    }
    margin-right: 0 !important;
}

#nav-icon {
    height: 56px;
    cursor: pointer;
}

.user-btn {
    height: 100% !important;

    .btn__content {
        padding-right: 8px !important;
    }
}

.nav-avatar-icon {
    width: 50px;
    height: auto;
    border-radius: 50%;
    margin: auto 0 auto 0;
}
</style>