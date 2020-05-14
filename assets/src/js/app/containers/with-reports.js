import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import reportsToLineChart from '../../../../../src/transformer/reports-to-line-chart';

const withReports = (component) => {
    return Vue.component('WithReportsContainer', {
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                datasets: [],
                labels: [],
            };
        },
        computed: {
            ...mapState('sites', ['sites']),
        },
        methods: {
            ...mapActions('reports', ['fetchReportsForSite']),
            loadData() {
                return this.fetchReportsForSite({ id: this.id })
                    .then(data => reportsToLineChart(data))
                    .then(({ datasets, labels }) => {
                        this.datasets = datasets;
                        this.labels = labels;
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
                    id: this.id,
                    datasets: this.datasets,
                    labels: this.labels,
                    ...this.$attrs,
                },
            });
        },
    });
};

export default withReports;
