import Vue from 'vue';
import { mapActions } from 'vuex';

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

        methods: {
            ...mapActions('sites', ['getCurrentSite']),

            load() {
                this.isLoading = true;
                this.getCurrentSite({ siteId: this.id })
                    .then((site) => {
                        this.site = site;
                    })
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
                site: this.site,
                isLoading: this.isLoading,
            };

            return h(
                Component,
                {
                    attrs: {
                        ...this.$attrs,
                        ...props,
                    },
                    props: {
                        ...this.$props,
                        ...props,
                    },
                    on: this.$listeners,
                });
        },
    });
};

export default withSiteInfo;
