<template>
    <div class="bar">
        <div ref="chart"/>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import { BAR_CHART } from '../../../config/chart-options';

    export default {
        props: {
            series: {
                type: Array,
                required: true,
            },
            labels: {
                type: Array,
                required: true,
            },
            options: {
                type: Object,
                default: () => ({}),
            },
        },

        data() {
            return {
                chart: null,
            };
        },

        methods: {
            buildChart() {
                this.chart = new ApexCharts(this.$refs.chart, BAR_CHART);
                this.chart.render();
                this.updateChart();
            },

            updateChart() {
                this.chart.updateOptions({
                    xaxis: {
                        show: false,
                        categories: this.labels,
                    },
                });
                this.chart.updateSeries(this.series);
            },
        },

        watch: {
            dataSets() {
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
