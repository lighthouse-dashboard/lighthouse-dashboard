<template>
    <v-app>
        <v-card outlined>
            <v-container :fluid="true"
                    v-if="isLoggedIn">
                <nav-bar/>
                <create-site-form/>
                <v-content>
                    <router-view></router-view>
                </v-content>
            </v-container>
            <v-container v-else>
                <login/>
            </v-container>
        </v-card>
        <footer-component/>
    </v-app>
</template>

<script>

    import { mapActions, mapState } from 'vuex';
    import CreateSiteForm from './components/create-site-form/create-site-form';
    import FooterComponent from './components/footer/footer';
    import NavBar from './components/nav-bar/nav-bar';
    import Login from './pages/login/login';
    import colorPreference from './utils/color-preference';

    export default {
        components: {
            CreateSiteForm,
            FooterComponent,
            NavBar,
            Login,
        },

        computed: {
            ...mapState('login', ['isLoggedIn', 'jwt']),
        },
        methods: {
            ...mapActions('login', ['logout']),
        },

        created() {
            this.$vuetify.theme.dark = colorPreference() === 'dark';
        },
    };
</script>
