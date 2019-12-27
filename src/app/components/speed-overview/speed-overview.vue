<template>
    <v-card>
        <v-card-title>
            Performance
        </v-card-title>

        <v-card-text>
            <div ref="chart"/>
        </v-card-text>
    </v-card>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import axios from 'axios';
    import { SPEED_OVERVIEW_CHART } from '../../config/chart-options';
    import { SPEED_OVERVIEW_URL } from '../../config/routes';

    export default {
        props: {},

        data() {
            return {
                chart: null,
                chartData: null,
            };
        },
        methods: {
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

            loadData() {
                axios.get(SPEED_OVERVIEW_URL)
                    .then(({ data }) => {
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
        mounted() {
            this.buildChart();
            this.loadData();
        },
    };
</script>
