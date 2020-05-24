<template>
    <overlay title='Create Site'
            :active='isOverlayOpen'
            v-on='$listeners'>
        <site-create-form v-model='siteConfig'/>
        <error-message :error='errorMessage'/>
        <template slot='additional'>
            <btn @click='onCreateClicked'>
                Create
            </btn>
        </template>
    </overlay>
</template>


<script>
    import { mapActions } from 'vuex';
    import Btn from '../../base/btn/btn';
    import ErrorMessage from '../../error-message/error-message';
    import SiteCreateForm from '../../site-create-form/site-create-form';
    import Overlay from '../overlay';

    export default {
        components: { ErrorMessage, Btn, SiteCreateForm, Overlay },
        data() {
            return {
                errorMessage: null,
                isOverlayOpen: true,
                siteConfig: {
                    name: '',
                    url: '',
                    device: 'desktop',
                    is_favorite: true,
                },
            };
        },

        methods: {
            ...mapActions('sites', ['createSite']),

            onCreateClicked() {
                this.createSite({ siteConfig: this.siteConfig })
                    .then((result) => {
                        this.isOverlayOpen = false;
                        this.$router.push({ name: 'project.detail', params: { id: result.id } });
                    })
                    .catch(e => {
                        this.errorMessage = e;
                    });
            },
        },
    };
</script>
