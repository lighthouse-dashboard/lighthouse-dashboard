<template>
    <overlay title='Create Site'
            :active='isOverlayOpen'
            v-on='$listeners'>
        <site-create-form v-model='siteConfig'/>

        {{ siteConfig }}
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
    import SiteCreateForm from '../../site-create-form/site-create-form';
    import Overlay from '../overlay';

    export default {
        components: { Btn, SiteCreateForm, Overlay },
        data() {
            return {
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
                    .then(() => {
                        this.isOverlayOpen = false;
                    })
            },
        },
    };
</script>
