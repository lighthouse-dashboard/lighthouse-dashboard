import Vue from 'vue';
import { mapActions } from 'vuex';

const withLatestReport = (component) => {
    return Vue.component('WithLatestReportContainer', {
        props: {
            siteId: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                report: null,
            };
        },

        methods: {
            ...mapActions('reports', ['fetchLatestReportForSite']),
            loadData() {
                return this.fetchLatestReportForSite({ siteId: this.siteId })
                    .then((report) => {
                        this.report = report;
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
                    report: this.report,
                    ...this.$attrs,
                },
            });
        },
    });
};

export default withLatestReport;
