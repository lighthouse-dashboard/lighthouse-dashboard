<template>
    <v-app>
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
                        icon>
                    <v-icon>mdi-desktop-mac-dashboard</v-icon>
                </v-btn>
                <v-btn to="/projects"
                        text
                        icon>
                    <v-icon>mdi-view-list</v-icon>
                </v-btn>
                <create-site-form/>

            </v-app-bar>

            <v-content>
                <router-view></router-view>
            </v-content>
        </div>
        <div v-else>
            <login/>
        </div>
    </v-app>
</template>

<script>

    import { GET_SITES_URL } from './config/routes';
    import { mapState } from 'vuex';
    import CONFIG from '../../dashboard.config';
    import CreateSiteForm from './components/create-site-form/create-site-form';
    import Login from './pages/login/login';
    import axios from './utils/axios';

    export default {
        components: {
            Login,
            CreateSiteForm,
        },

        computed: {
            ...mapState('login', ['isLoggedIn', 'jwt']),
        },

        created() {
            this.$vuetify.theme.dark = CONFIG.UI.USE_DARK_MODE;
            axios(this.jwt)
                .get(GET_SITES_URL)
                .catch((error) => {
                    if (error.isAxiosError) {
                        if (error.response.status === 401) {
                            this.logout();
                            this.$router.push('/login');
                        }
                    }
                });
        },
    };
</script>
