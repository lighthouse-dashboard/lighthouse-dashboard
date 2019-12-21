<template>
    <div class="site-overview box">
        <div class="title">
            <h2>
                <a :href="url">
                    {{ id }}
                </a>
            </h2>
        </div>
        <button @click="runAudit">Run {{ url }}</button>
        <div ref="chart"/>

        <span v-if="isLoading">Loading...</span>
        <span v-if="runError">{{ runError.message }}</span>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import axios from 'axios';
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
                isLoading: false,
                runError: null,
            };
        },
        methods: {
            buildChart() {
                var options = {
                    chart: {
                        height: 200,
                        type: 'line',
                    },
                    series: this.chartData.datasets,
                    xaxis: {
                        categories: this.chartData.labels
                    },
                    yaxis: {
                        show: false,
                        tickAmount: 5,
                        min: 0,
                        max: 100,
                    }
                };
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
            },

            loadData() {
                this.isLoading = true;
                axios.get(`/api/${ this.id }`)
                    .then(({ data }) => {
                        this.chartData = { ...data };
                        this.buildChart();
                        this.isLoading = false;
                    })
                    .catch(() => {
                        this.isLoading = false;
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
                this.isLoading = true;
                axios.post(`/api/${ this.id }`)
                    .catch((e) => {
                        this.isLoading = false;
                        if (e.isAxiosError) {
                            this.runError = e.response.data;
                            return;
                        }
                        this.runError = e;
                    });
            },
        },
        mounted() {
            this.loadData();
        },
    };
</script>
