<template>
    <overlay title='Create Site'
            :active='isOverlayOpen'
            v-on='$listeners'>
        <site-create-form v-model='siteConfig'/>
        <error-message :error='errorMessage'/>
        <template slot='additional'>
            <btn v-if='isEdit'
                    @click='onSaveClicked'>
                Save
            </btn>
            <btn v-else
                    @click='onCreateClicked'>
                Create
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
            config: {
                type: Object,
                default: null,
            },
        },
        data() {
            return {
                errorMessage: null,
                isOverlayOpen: true,
                /** @type {Sites.SiteConfig} */
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
                    .then((result) => {
                        this.isOverlayOpen = false;
                        this.$router.push({ name: 'project.detail', params: { id: result.id } });
                        Toastify({
                            text: 'Site created',
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
                    },
                })
                    .then(() => {
                        this.isOverlayOpen = false;
                        this.$emit('updated');
                        Toastify({
                            text: 'Site updated',
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
            };
        },
    };
</script>
