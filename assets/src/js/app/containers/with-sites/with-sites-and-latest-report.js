import Vue from 'vue';
import { mapActions } from 'vuex';

export default function withSitesAndLatestReport(component) {
    return Vue.component('WithSitesAndLatestReportContainer', {
        props: {},

        data() {
            return {
                /** @type {Sites.SiteWithReport[]} */
                sites: [],
                isLoading: false,
            };
        },

        methods: {
            ...mapActions('sites', ['getSitesWithLatestReport']),
            loadData() {
                this.isLoading = true;
                return this.getSitesWithLatestReport()
                    .then((reports) => {
                        this.sites = reports;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        mounted() {
            this.loadData();
        },

        render(createElement) {
            return createElement(component, {
                props: {
                    sites: this.sites,
                    isLoading: this.isLoading,
                    ...this.$attrs,
                },
            });
        },
    });
}
