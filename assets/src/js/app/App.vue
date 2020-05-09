<template>
    <div class="app"
            :class='classes'>
        <div>
            <navigation :title='name'
                    v-if="isLoggedIn"/>
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
    import { name } from '../../../../package.json';
    import Navigation from './components/navigation/navigation';
    import bemMixin from './mixins/bem-mixin';
    import Login from './pages/login/login';
    import theme from './utils/get-theme';

    export default {
        components: {
            Login,
            Navigation,
        },
        mixins: [bemMixin('app')],
        data() {
            return {
                name,
            };
        },

        computed: {
            ...mapState('login', ['isLoggedIn', 'jwt']),
            classes() {
                return [
                    this.createIfFacet(this.isLoggedIn, 'logged-in'),
                ]
            }
        },
        methods: {
            ...mapActions('login', ['logout']),
        },

        created() {
            this.$vuetify.theme.dark = theme().app === 'dark';
        },
    };
</script>
