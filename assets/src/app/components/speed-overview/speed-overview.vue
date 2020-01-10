<template>
    <div>
        <h2 class="display-1">Performance comparison</h2>

        <v-card-text>
            <div ref="chart"/>
        </v-card-text>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import { mapActions, mapState } from 'vuex';
    import { SPEED_OVERVIEW_CHART } from '../../config/chart-options';

    export default {
        props: {},

        data() {
            return {
                chart: null,
                chartData: null,
            };
        },
        computed: {
            ...mapState('login', ['jwt']),
        },
        methods: {
            ...mapActions('reports', ['fetchReportOverview']),

            buildChart() {
                var options = Object.assign({}, SPEED_OVERVIEW_CHART);
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

            async loadData() {
                const data = await this.fetchReportOverview();
                this.chartData = { ...data, datasets: this.modifyDataSets(data.datasets) };
                this.updateChart();
            },

            modifyDataSets(datasets) {
                return datasets.map((dataset) => {
                    return {
                        ...dataset,
                    };
                });
            },
        },
        mounted() {
            this.buildChart();
            this.loadData();
        },
    };
</script>
