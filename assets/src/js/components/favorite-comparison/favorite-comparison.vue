<template>
    <div>
        <v-subheader>
            Performance comparison
        </v-subheader>
        <v-card flat>
            <v-card-text>
                <div ref="chart"/>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import { mapActions, mapState } from 'vuex';
    import { DASHBOARD } from '../../../../../dashboard.config';
    import { COMPARISON_CHART } from '../../config/chart-options';

    export default {
        props: {},

        data() {
            return {
                chart: null,
                chartData: null,
                interval: null,
            };
        },

        computed: {
            ...mapState('login', ['jwt']),
        },

        methods: {
            ...mapActions('reports', ['fetchReportOverview']),

            buildChart() {
                var options = Object.assign({}, COMPARISON_CHART);
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
            },

            updateChart() {
                this.chart.updateOptions({
                    xaxis: {
                        categories: this.chartData.labels,
                    },
                });
                this.chart.updateSeries(this.chartData.datasets);
            },

            loadData() {
                this.fetchReportOverview()
                    .then(data => {
                        this.chartData = { ...data, datasets: this.modifyDataSets(data.datasets) };
                        this.updateChart();
                    });
            },

            modifyDataSets(datasets) {
                return datasets.map((dataset) => {
                    return {
                        ...dataset,
                    };
                });
            },
        },

        beforeDestroy() {
            clearInterval(this.interval);
        },

        mounted() {
            this.buildChart();
            this.loadData();
            this.interval = setInterval(() => {
                this.loadData();
            }, DASHBOARD.UPDATE_INTERVAL);
        },
    };
</script>
