<template>
    <v-app id="inspire"
    >
        <div v-if="isLoggedIn">
            <v-app-bar
                    app
                    clipped-left
                    v-if="isLoggedIn"
            >
                <v-toolbar-title>
                    Project Dashboard
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn to="/"
                        text
                        icon
                        color="green darken-1">
                    <v-icon>mdi-desktop-mac-dashboard</v-icon>
                </v-btn>
                <v-btn to="/projects"
                        text
                        icon
                        color="green darken-1">
                    <v-icon>mdi-view-list</v-icon>
                </v-btn>
            </v-app-bar>

            <v-content>
                <router-view></router-view>
                <create-site-form/>
            </v-content>
        </div>
        <div v-else>
            <login/>
        </div>

        <v-footer app/>
    </v-app>
</template>

<script>

    import { mapGetters } from 'vuex';
    import CONFIG from '../../dashboard.config';
    import CreateSiteForm from './components/create-site-form/create-site-form';
    import Login from './pages/login/login';

    export default {
        components: {
            Login,
            CreateSiteForm,
        },

        computed: {
            ...mapGetters('login', ['isLoggedIn']),
        },

        created() {
            this.$vuetify.theme.dark = CONFIG.UI.USE_DARK_MODE;
        },
    };
</script>
