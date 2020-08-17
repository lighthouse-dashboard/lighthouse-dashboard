<template>
    <overlay :title="$t('site-create.title')"
            :active="isOverlayOpen"
            v-on="$listeners">
        <site-create-form v-model="siteConfig"
                v-if="siteConfig"/>

        <error-message :error="errorMessage"/>
        <template slot="additional">
            <btn v-if="isEdit"
                    @click="onSaveClicked">
                {{ $t('site-create.save-btn') }}
            </btn>
            <btn v-else
                    @click="onCreateClicked">
                {{ $t('site-create.abort-btn') }}
            </btn>
        </template>
    </overlay>
</template>


<script>
    import Toastify from 'toastify-js';
    import { mapActions } from 'vuex';
    import Btn from '../../base/btn/btn';
    import ErrorMessage from '../../error-message/error-message';
    import SiteCreateForm from '../../site-create-form/site-create-form';
    import Overlay from '../overlay';

    export default {
        components: { ErrorMessage, Btn, SiteCreateForm, Overlay },
        props: {
            /** @type {Sites.SiteModel | null} */
            config: {
                type: Object,
                default: null,
            },
        },

        data() {
            return {
                errorMessage: null,
                isOverlayOpen: true,
                /** @type {Sites.SiteModel} */
                siteConfig: null,
            };
        },

        computed: {
            isEdit() {
                return !!this.config;
            },
        },

        methods: {
            ...mapActions('sites', ['createSite', 'updateSite']),

            onCreateClicked() {
                this.createSite({ siteConfig: this.siteConfig })
                    .then((site) => {
                        this.$emit('done', { site });
                        Toastify({
                            text: this.$t('site-create.create-notification-text'),
                            className: 'info',
                        }).showToast();
                    })
                    .catch(e => {
                        this.errorMessage = e;
                    });
            },

            onSaveClicked() {
                this.updateSite({
                    id: this.siteConfig.id,
                    delta: {
                        name: this.siteConfig.name,
                        url: this.siteConfig.url,
                        is_favorite: this.siteConfig.is_favorite,
                        is_disabled: this.siteConfig.is_disabled,
                    },
                })
                    .then(() => {
                        this.$emit('updated');
                        this.$emit('done');
                        Toastify({
                            text: this.$t('site-create.update-notification-text'),
                            className: 'info',
                        }).showToast();
                    })
                    .catch(e => {
                        this.errorMessage = e;
                    });
            },
        },

        mounted() {
            this.siteConfig = this.isEdit ? { ...this.config } : {
                name: '',
                url: '',
                device: 'desktop',
                is_favorite: true,
                is_disabled: false,
            };
        },
    };
</script>
