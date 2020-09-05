<template>
    <div class="site-edit-btn">
        <site-create-overlay
                :config="site"
                v-if="site && isEdit"
                :id="id"
                @close="close"
                @done="toggleEdit"/>

        <btn :facets="['secondary', 'full-width']"
                @click="toggleEdit">
            {{ $t('site.edit-btn-label') }}
        </btn>
    </div>
</template>

<script>
    import Btn from '../base/btn/btn';
    import SiteCreateOverlay from '../overlay/site-create-overlay/site-create-overlay';

    export default {
        components: { Btn, SiteCreateOverlay },
        props: {
            id: {
                type: String,
                required: true,
            },
            site: {
                type: Object,
                required: true,
            },
        },

        data: () => ({
            isEdit: false,
        }),

        methods: {
            close() {
                this.isEdit = false;
            },
            toggleEdit() {
                this.isEdit = !this.isEdit;
            },
        },
    };
</script>
