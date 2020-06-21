<template>
    <div class='side-nav'
            :class='rootClasses'>
        <side-nav-toggle
                class='side-nav--mobile-toggle'
                v-if='!isOpen'
                @toggle='toggleDrawer'/>

        <div class='side-nav--backdrop'
                @click='toggleDrawer'/>

        <nav class='side-nav--drawer'>
            <div class='side-nav--top'>
                <div class="side-nav--header">
                    <img class="side-nav--logo"
                            src="/static/img/logo_small.png"/>
                    <close-btn class='side-nav--close-btn'
                            @click='toggleDrawer'/>
                </div>


                <ul class="side-nav--list">
                    <li>
                        <a href="/app/dashboard"
                                class="side-nav--list-item">
                            Dashboard

                        </a>
                    </li>
                    <li>
                        <a href="/app/projects"
                                class="side-nav--list-item">
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="/app/system"
                                class="side-nav--list-item">
                            System
                        </a>
                    </li>
                </ul>
            </div>

            <div class='side-nav--secondary'>
                <btn
                        class='side-nav--action'
                        :facets='["primary", "full-width"]'
                        @click='toggleCreateOverlay'>
                    New Site
                </btn>

                <btn
                        class='side-nav--action'
                        :facets='["danger", "full-width"]'
                        @click='onLogoutClicked'>
                    Logout
                </btn>
            </div>
        </nav>
        <site-create-overlay v-if='isCreateOverlayOpen'
                @close='toggleCreateOverlay'/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import bemMixin from '../../mixins/bem-mixin';
    import Btn from '../base/btn/btn';
    import CloseBtn from '../close-btn/close-btn';
    import SiteCreateOverlay from '../overlay/site-create-overlay/site-create-overlay';
    import SideNavToggle from './side-nav-toggle/side-nav-toggle';

    export default {
        components: { CloseBtn, SiteCreateOverlay, Btn, SideNavToggle },

        mixins: [bemMixin('side-nav')],

        props: {
            title: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                isOpen: false,
                isCreateOverlayOpen: false,
            };
        },

        computed: {
            rootClasses() {
                return [
                    this.createIfFacet(this.isOpen, 'open'),
                ];
            },
        },

        methods: {
            ...mapActions('login', ['logout']),

            toggleCreateOverlay() {
                this.isCreateOverlayOpen = !this.isCreateOverlayOpen;
            },

            toggleDrawer() {
                this.isOpen = !this.isOpen;
            },

            closeDrawer() {
                this.isOpen = false;
            },

            onLogoutClicked() {
                this.logout();
                this.$router.push({ name: 'login' });
            },
        },

        watch: {
            $route() {
                this.closeDrawer();
            },
        },
    };
</script>
