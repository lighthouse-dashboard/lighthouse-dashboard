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
                    <p class="side-nav--title">
                        {{ title }} <small>v{{ version }}</small>
                    </p>
                    <close-btn class='side-nav--close-btn' @click='toggleDrawer'/>
                </div>


                <ul class="side-nav--list">
                    <router-link
                            tag="li"
                            active-class="side-nav--list-item__active"
                            class="side-nav--list-item"
                            exact
                            :to="{name: 'dashboard'}">
                        Dashboard
                    </router-link>

                    <router-link
                            tag="li"
                            active-class="side-nav--list-item__active"
                            class="side-nav--list-item"
                            :to="{name: 'projects'}">
                        Projects
                    </router-link>
                </ul>
            </div>

            <div class='side-nav--secondary'>
                <btn
                        class='side-nav--action'
                        @click='toggleCreateOverlay'
                        :facets='["primary", "full-width"]'>
                    New Site
                </btn>
            </div>

            <site-create-overlay v-if='isCreateOverlayOpen'
                    @close='toggleCreateOverlay'/>

        </nav>
    </div>
</template>

<script>
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

            version: {
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
            toggleCreateOverlay() {
                this.isCreateOverlayOpen = !this.isCreateOverlayOpen;
            },

            toggleDrawer() {
                this.isOpen = !this.isOpen;
            },

            closeDrawer() {
                this.isOpen = false;
            },
        },

        watch: {
            $route() {
                this.closeDrawer();
            },
        },
    };
</script>
