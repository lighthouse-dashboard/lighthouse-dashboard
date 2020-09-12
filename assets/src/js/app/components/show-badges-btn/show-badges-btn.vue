<template>
    <div class="show-badges-btn">
        <badges-overlay :is-active="isActive"
                :site-id="siteId"
                @close="onClose"></badges-overlay>
        <btn :facets="['flat']"
                @click="toggle">
            {{ $t('badges.toggle-btn-text') }}
        </btn>
    </div>
</template>

<script>
    import Btn from '../base/btn/btn';
    import BadgesOverlay from '../overlay/badges-overlay/badges-overlay';

    export default {
        components: { Btn, BadgesOverlay },
        props: {
            siteId: {
                type: String,
                required: true,
            },
        },
        data: () => ({
            isActive: false,
        }),
        methods: {
            toggle() {
                this.isActive = !this.isActive;
            },
            onClose() {
                this.isActive = false
            },
        },
    };
</script>
