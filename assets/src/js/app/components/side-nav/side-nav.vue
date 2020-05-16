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
                <button class='side-nav--close-btn'
                        @click='toggleDrawer'>Close
                </button>
                <div class="side-nav--header">
                    <img class="side-nav--logo"
                            src="/static/img/logo_small.png"/>
                    <p class="side-nav--title">
                        {{ title }}
                    </p>
                </div>
                <ul class="side-nav--list">
                    <router-link
                            tag="li"
                            active-class="side-nav--list-item__active"
                            class="side-nav--list-item"
                            exact
                            :to="{name: 'dashboard'}">Dashboard
                    </router-link>

                    <router-link
                            tag="li"
                            active-class="side-nav--list-item__active"
                            class="side-nav--list-item"
                            :to="{name: 'overview'}">Projects Overview
                    </router-link>

                    <router-link
                            tag="li"
                            active-class="side-nav--list-item__active"
                            class="side-nav--list-item"
                            :to="{name: 'projects'}">Search
                    </router-link>
                </ul>
            </div>

            <div class='side-nav--bottom'>
                <ul class='side-nav--list'>
                    <li class='side-nav--list-item side-nav--list-item__footer'>
                        <btn href="https://github.com/faebeee/lighthouse-dashboard"
                                target="_blank">
                            v{{ version }}
                        </btn>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import bemMixin from '../../mixins/bem-mixin';
    import Btn from '../base/btn/btn';
    import SideNavToggle from './side-nav-toggle/side-nav-toggle';

    export default {
        components: { Btn, SideNavToggle },
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
            toggleDrawer() {
                this.isOpen = !this.isOpen;
            },
        },
    };
</script>
