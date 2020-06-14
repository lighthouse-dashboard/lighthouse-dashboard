import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { createElementProps } from './utils/create-element-props';

const withSiteInfo = (Component) => {
    return Vue.component('WithSiteInfoContainer', {
        props: {
            id: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                site: null,
                isLoading: true,
            };
        },

        computed: {
            ...mapState('sites', ['currentSiteConfig']),
        },

        methods: {
            ...mapActions('sites', ['getCurrentSite']),

            load() {
                this.isLoading = true;
                this.getCurrentSite({ siteId: this.id })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        mounted() {
            this.load();
        },

        render(h) {
            const props = {
                site: this.currentSiteConfig,
                isLoading: this.isLoading,
            };

            return h(Component, createElementProps(props, this));
        },
    });
};

export default withSiteInfo;
