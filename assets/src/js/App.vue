<template>
    <v-app>
        <nav-bar/>
        <v-content>
            <router-view/>
        </v-content>
        <footer-component/>
    </v-app>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import FooterComponent from './components/footer/footer';
    import NavBar from './components/nav-bar/nav-bar';
    import colorPreference from './utils/color-preference';

    export default {
        components: {
            FooterComponent,
            NavBar,
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
