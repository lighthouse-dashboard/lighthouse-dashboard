<template>
    <v-app>
        <div v-if="isLoggedIn">
            <nav-bar/>
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
    import NavBar from './components/nav-bar/nav-bar';
    import Login from './pages/login/login';

    export default {
        components: {
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
            this.$vuetify.theme.dark = CONFIG.UI.THEME === 'dark';
        },
    };
</script>
