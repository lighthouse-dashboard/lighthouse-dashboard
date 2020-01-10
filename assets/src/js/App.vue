<template>
    <v-app>
        <div v-if="isLoggedIn">
            <v-app-bar
                    app
                    flat
                    elevate-on-scroll
                    hide-on-scroll
                    v-if="isLoggedIn">
                <v-toolbar-title>Performance Dashboard</v-toolbar-title>
                <v-spacer/>

                <template v-slot:extension>
                    <v-container fluid>
                        <v-tabs align-with-title
                                background-color="transparent"
                                color="secondary">
                            <v-tab to="/">Dashboard</v-tab>
                            <v-tab to="/projects">Projects</v-tab>
                        </v-tabs>
                        <create-site-form/>
                    </v-container>
                </template>
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

    import { mapActions, mapState } from 'vuex';
    import CONFIG from '../../../dashboard.config';
    import CreateSiteForm from './components/create-site-form/create-site-form';
    import Login from './pages/login/login';

    export default {
        components: {
            Login,
            CreateSiteForm,
        },

        computed: {
            ...mapState('login', ['isLoggedIn', 'jwt']),
        },

        methods: {
            ...mapActions('login', ['logout']),
        },

        created() {
            this.$vuetify.theme.dark = CONFIG.UI.THEME === 'dark';
        },
    };
</script>
