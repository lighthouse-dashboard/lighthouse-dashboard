<template>
    <div class="site-overview box">
        <h2 class="title center">Performance Overview</h2>
        <div ref="chart"/>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import axios from 'axios';
    import { REPORT_AUDIT_KEYS } from '../../../../config/audit';
    import { COLORS } from '../../../../config/colors';
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
                var options = {
                    chart: {
                        height: 400,
                        type: 'bar',
                    },
                    series: this.chartData.datasets,
                    xaxis: {
                        categories: this.chartData.labels,
                    },
                    yaxis: {
                        show: false,
                        tickAmount: 5,
                        min: 0,
                        max: 100,
                    },
                };
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
            },

            loadData() {
                axios.get(SPEED_OVERVIEW_URL)
                    .then(({ data }) => {
                        this.chartData = { ...data, datasets: this.modifyDataSets(data.datasets) };
                        this.buildChart();
                    });
            },

            modifyDataSets(datasets) {
                return datasets.map((dataset) => {
                    return {
                        ...dataset,
                        backgroundColor: COLORS[REPORT_AUDIT_KEYS.PERFORMANCE],
                        pointRadius: 5,
                        pointHoverRadius: 15,
                        fill: false,
                    };
                });
            },
        },
        mounted() {
            this.loadData();
        },
    };
</script>
