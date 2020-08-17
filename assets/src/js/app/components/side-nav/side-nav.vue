<template>
    <div class="side-nav"
            :class="rootClasses">
        <side-nav-toggle
                class="side-nav--mobile-toggle"
                v-if="!isOpen"
                @toggle="toggleDrawer"/>

        <div class="side-nav--backdrop"
                @click="toggleDrawer"/>

        <nav class="side-nav--drawer">
            <div class="side-nav--top">
                <div class="side-nav--header">
                    <img class="side-nav--logo"
                            src="/static/img/logo_small.png">
                    <close-btn class="side-nav--close-btn"
                            @click="toggleDrawer"/>
                </div>

                <ul class="side-nav--list">
                    <li>
                        <a href="/app/dashboard"
                                class="side-nav--list-item">
                            {{ $t('navigation.dashboard-link-text') }}
                        </a>
                    </li>
                    <li>
                        <a href="/app/projects"
                                class="side-nav--list-item">
                            {{ $t('navigation.projects-link-text') }}
                        </a>
                    </li>
                    <li>
                        <a href="/app/system"
                                class="side-nav--list-item">
                            {{ $t('navigation.system-link-text') }}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import bemMixin from '../../mixins/bem-mixin';
    import CloseBtn from '../close-btn/close-btn';
    import SideNavToggle from './side-nav-toggle/side-nav-toggle';

    export default {
        components: { CloseBtn, SideNavToggle },

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
