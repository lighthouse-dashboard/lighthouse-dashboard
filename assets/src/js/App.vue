<template>
    <v-app class="app"
            id="inspire">
        <navigation/>

        <v-content class="app--content-wrapper">
            <div class='app--content'>
                <router-view v-if="isLoggedIn"/>
                <login v-else/>
            </div>
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
