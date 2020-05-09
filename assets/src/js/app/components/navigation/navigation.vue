<template>
    <div class='navigation'
            :class='rootClasses'>
        <navigation-toggle
                class='navigation--mobile-toggle'
                v-if='!isOpen'
                @toggle='toggleDrawer'/>

        <div class='navigation--backdrop'
                @click='toggleDrawer'/>

        <nav class='navigation--drawer'>
            <div class='navigation--top'>
                <button class='navigation--close-btn'
                        @click='toggleDrawer'>Close
                </button>
                <div class="navigation--header">
                    <img class="navigation--logo"
                            src="/static/img/logo_small.png"/>
                    <p class="navigation--title">
                        {{ title }}
                    </p>
                </div>
                <ul class="navigation--list">
                    <router-link
                            tag="li"
                            active-class="navigation--list-item__active"
                            class="navigation--list-item"
                            exact
                            :to="{name: 'home'}">Dashboard
                    </router-link>

                    <router-link
                            tag="li"
                            active-class="navigation--list-item__active"
                            class="navigation--list-item"
                            :to="{name: 'overview'}">Projects Overview
                    </router-link>

                    <router-link
                            tag="li"
                            active-class="navigation--list-item__active"
                            class="navigation--list-item"
                            :to="{name: 'projects'}">Search
                    </router-link>
                </ul>
            </div>

            <div class='navigation--bottom'>
                <ul class='navigation--list'>
                    <li class='navigation--list-item navigation--list-item__footer'>
                        <small>v{{ version }}</small>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import bemMixin from '../../mixins/bem-mixin';
    import NavigationToggle from './navigation-toggle/navigation-toggle';

    export default {
        components: { NavigationToggle },
        mixins: [bemMixin('navigation')],
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
