<template>
    <div class="gauge-chart">
        <div ref="chart"/>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import { GAUGE_CHART } from '../../../config/chart-options';

    export default {
        props: {
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
                const options = Object.assign({}, GAUGE_CHART, {
                    series: [],
                    labels: [],
                });
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
            },
        },
        watch: {
            labels(val) {
                this.chart.updateOptions({
                    labels: val,
                });
            },
            series(val) {
                this.chart.updateSeries(val);
            },
        },
        mounted() {
            this.buildChart();
        }
    };
</script>
