<template>
    <div class="site-overview box">
        <h2 class="title center">Speed Overview</h2>
        <canvas
                style="width: 100%; height: 400px"
                ref="chart"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import Chart from 'chart.js';
    import { TIMINGS } from '../../../../config/audit';
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
                        responsive: false,
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
                        backgroundColor: COLORS[TIMINGS.SPEED_INDEX],
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
