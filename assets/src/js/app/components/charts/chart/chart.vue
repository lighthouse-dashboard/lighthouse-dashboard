<template>
    <div class="chart">
        <div ref="chart"/>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import { SITE_OVERVIEW_CHART } from '../../../config/chart-options';

    export default {
        props: {
            type: {
                type: String,
                required: true,
            },

            /**
             * Apex config options
             */
            config: {
                type: Object,
                default: () => ({  }),
            },

            /** @type string[]} */
            labels: {
                type: Array,
                required: true,
            },

            /** @type {string[]} */
            series: {
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
                const options = Object.assign({}, this.config, {
                    type: this.type,
                    series: [],
                    labels: [],
                });
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
                this.updateChart();
            },

            updateChart() {
                this.chart.updateOptions({
                    labels: this.labels,
                });
                this.chart.updateSeries(this.series);
            },
        },
        watch: {
            labels() {
                this.updateChart();
            },
            series() {
                this.updateChart();
            },
        },
        mounted() {
            this.buildChart();
        },
    };
</script>
