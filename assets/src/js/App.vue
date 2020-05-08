<template>
    <div class="app"
            id="inspire">
        <div>
            <navigation/>
        </div>

        <div class="app--content-wrapper">
            <div class='app--content'>
                <router-view v-if="isLoggedIn"/>
                <login v-else/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import Navigation from './components/navigation/navigation';
    import Login from './pages/login/login';
    import theme from './utils/get-theme';

    export default {
        components: {
            Login,
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
