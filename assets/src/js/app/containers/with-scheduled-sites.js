import Vue from 'vue';
import { mapActions } from 'vuex';
import { createElementProps } from './utils/create-element-props';

const withScheduledSites = (Component) => {
    return Vue.component('WithScheduledSitesContainer', {
        data() {
            return {
                sites: [],
                isLoading: false,
            };
        },

        methods: {
            ...mapActions('sites', ['fetchScheduledSites']),
        },

        mounted() {
            this.isLoading = true;
            this.fetchScheduledSites()
                .then((sites) => {
                    this.sites = sites;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        render(h) {
            const props = {
                sites: this.sites,
                isLoading: this.isLoading,
            };

            return h(Component, createElementProps(props, this));
        },
    });
};

export default withScheduledSites;
