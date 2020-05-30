import Vue from 'vue';
import { mapActions } from 'vuex';

const withLatestSites = (component) => {
    return Vue.component('WithLatestSitesContainer', {
        data() {
            return {
                sites: [],
            };
        },

        methods: {
            ...mapActions('sites', ['getLatestSites']),
        },

        mounted() {
            this.getLatestSites()
                .then((sites) => {
                    this.sites = sites;
                });
        },

        render(createElement) {
            return createElement(component, {
                props: {
                    sites: this.sites,
                },
            });
        },
    });
};

export default withLatestSites;
