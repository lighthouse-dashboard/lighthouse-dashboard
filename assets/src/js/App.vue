<template>
    <v-app id="inspire">
        <navigation/>

        <v-content>
            <router-view v-if="isLoggedIn"/>
            <login v-else/>
        </v-content>
        <footer-component/>
    </v-app>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import FooterComponent from './components/footer/footer';
    import Navigation from './components/navigation/navigation';
    import Login from './pages/login/login';
    import colorPreference from './utils/color-preference';

    export default {
        components: {
            Login,
            FooterComponent,
            Navigation,
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
