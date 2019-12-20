<template>
    <div class="site-overview box">
        <div class="title"><h2>{{ id }}</h2></div>
        <button @click="runAudit">Run {{ url }}</button>
        <canvas
                style="width: 100%; height: 400px"
                ref="chart"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import Chart from 'chart.js';
    import colors from '../../../../config/colors';

    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                chart: null,
                chartData: null,
            };
        },
        methods: {
            buildChart() {
                this.chart = new Chart(this.$refs.chart, {
                    type: 'line',
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
                axios.get(`/api/${ this.id }`)
                    .then(({ data }) => {
                        this.chartData = { ...data, datasets: this.modifyDataSets(data.datasets) };
                        this.buildChart();
                    });
            },

            modifyDataSets(datasets) {
                return datasets.map((dataset, index) => {
                    return {
                        ...dataset,
                        borderColor: colors[index],
                        pointRadius: 5,
                        pointHoverRadius: 15,
                        fill: false,
                    };
                });
            },

            runAudit() {
                axios.post(`/api/${ this.id }`);
            },
        },
        mounted() {
            this.loadData();
        },
    };
</script>
