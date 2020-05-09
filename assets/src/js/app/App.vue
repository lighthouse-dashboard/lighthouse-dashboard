<template>
    <app-layout :class='classes'>
        <template slot='sidebar'>
            <navigation :title='name'
                    :version='version'
                    v-if="isLoggedIn"/>
        </template>

        <template slot='content'>
            <router-view v-if="isLoggedIn"/>
            <login v-else/>
        </template>
    </app-layout>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { name, version } from '../../../../package.json';
    import AppLayout from './components/layouts/app-layout/app-layout';
    import Navigation from './components/navigation/navigation';
    import bemMixin from './mixins/bem-mixin';
    import Login from './pages/login/login';
    import theme from './utils/get-theme';

    export default {
        components: {
            AppLayout,
            Login,
            Navigation,
        },
        mixins: [bemMixin('app')],
        data() {
            return {
                name,
                version
            };
        },

        computed: {
            ...mapState('login', ['isLoggedIn', 'jwt']),
            classes() {
                return [
                    this.createIfFacet(this.isLoggedIn, 'logged-in'),
                ];
            },
        },

        methods: {
            ...mapActions('login', ['logout']),
        },

        created() {
            this.$vuetify.theme.dark = theme().app === 'dark';
        },
    };
</script>
