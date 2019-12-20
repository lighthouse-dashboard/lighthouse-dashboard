<template>
    <div class="site-overview box">
        <h2 class="title center">Speed Overview</h2>
        <canvas
                ref="chart"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import Chart from 'chart.js';
    import { REPORT_AUDIT_KEYS } from '../../../../config/audit';
    import { COLORS } from '../../../../config/colors';

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
                this.chart = new Chart(this.$refs.chart, {
                    type: 'bar',
                    data: this.chartData,
                    options: {
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    max: 100,
                                    min: 0,
                                    stepSize: 5,
                                },
                            }],
                        },
                        elements: {
                            point: {
                                pointStyle: 'rectRot',
                            },
                        },
                    },
                });
            },

            loadData() {
                axios.get(`/api/speed`)
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
