<template>
    <div class="radar-chart">
        <div ref="chart"/>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import { RADAR_CHART } from '../../../config/chart-options';

    export default {
        props: {
            series: {
                type: Array,
                required: true,
            },

            /**
             *  @type {string[]}
             */
            labels: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                chart: null,
            };
        },

        methods: {
            buildChart() {
                const options = Object.assign({}, RADAR_CHART, {});
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
                this.updateChart();
            },

            updateChart() {
                this.chart.updateOptions({
                    series: this.series,
                    xaxis: {
                        categories: this.labels,
                    },
                });
                this.chart.updateSeries(this.series);
            },
        },


        watch: {
            series() {
                this.updateChart();
            },
            labels() {
                this.updateChart();
            },
        },

        mounted() {
            this.buildChart();
        },
    };
</script>
