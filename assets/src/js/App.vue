<template>
    <v-app id="inspire"
            class="app">
        <navigation/>

        <v-content class="app--content">
            <router-view v-if="isLoggedIn"/>
            <login v-else/>
            <footer-component/>
        </v-content>
    </v-app>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import FooterComponent from './components/footer/footer';
    import Navigation from './components/navigation/navigation';
    import Login from './pages/login/login';
    import theme from './utils/get-theme';

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
            this.$vuetify.theme.dark = theme().app === 'dark';
        },
    };
</script>
