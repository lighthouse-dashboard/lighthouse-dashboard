<template>
    <div class="create-site-btn">
        <btn
                class='side-nav--action'
                :facets='["flat", "full-width"]'
                @click='toggleCreateOverlay'>
            New Site
        </btn>
        <site-create-overlay v-if='isCreateOverlayOpen'
                @done="onDone"
                @close='toggleCreateOverlay'/>
    </div>
</template>

<script>
    import Btn from '../base/btn/btn';
    import SiteCreateOverlay from '../overlay/site-create-overlay/site-create-overlay';

    export default {
        components: { SiteCreateOverlay, Btn },
        props: {},

        data() {
            return {
                isOpen: false,
                isCreateOverlayOpen: false,
            };
        },

        methods: {
            /**
             * Handle done
             * @param {Sites.SiteConfig} site
             */
            onDone({ site }) {
                debugger;
                window.location.href = `/app/projects/${ site.id }`;
            },

            toggleCreateOverlay() {
                this.isCreateOverlayOpen = !this.isCreateOverlayOpen;
            },
        },
    };
</script>
