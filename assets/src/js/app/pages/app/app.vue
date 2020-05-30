<template>
    <app-layout :class='classes'>
        <template slot='sidebar'>
            <side-nav :title='name'
                    :version='version'
                    v-if="isLoggedIn"/>
        </template>

        <template slot='content'>
            <router-view/>
        </template>
    </app-layout>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { name, version } from '../../../../../../package.json';
    import AppLayout from '../../components/layouts/app-layout/app-layout';
    import SideNav from '../../components/side-nav/side-nav';
    import bemMixin from '../../mixins/bem-mixin';

    export default {
        components: {
            AppLayout,
            SideNav,
        },
        mixins: [bemMixin('app')],

        data() {
            return {
                name,
                version,
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
    };
</script>
