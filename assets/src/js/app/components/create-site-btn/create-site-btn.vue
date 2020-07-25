<template>
    <div class="create-site-btn">
        <btn
                class="side-nav--action"
                :facets="['flat', 'full-width']"
                @click="toggleCreateOverlay">
            {{ $t('site-create.title') }}
        </btn>
        <site-create-overlay v-if="isCreateOverlayOpen"
                @done="onDone"
                @close="toggleCreateOverlay"/>
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
             * @param {Sites.SiteModel} site
             */
            onDone({ site }) {
                window.location.href = `/app/projects/${ site.id }`;
            },

            toggleCreateOverlay() {
                console.log('toggle');
                this.isCreateOverlayOpen = !this.isCreateOverlayOpen;
            },
        },
    };
</script>
