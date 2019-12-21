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

        <progress class="progress is-small is-primary"
                max="100"
                v-if="isLoading"></progress>

        <span v-if="runError">{{ runError.message }}</span>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import axios from 'axios';
    import { SITE_OVERVIEW_CHART } from '../../config/chart-options';
    import { CREATE_REPORT_URL, GET_REPORT_URL } from '../../config/routes';

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
                chartData: {
                    datasets: [],
                    labels: [],
                },
                isLoading: false,
                runError: null,
            };
        },
        methods: {
            buildChart() {
                const options = Object.assign({}, SITE_OVERVIEW_CHART, {
                    series: [],
                    xaxis: {
                        categories: [],
                    },
                });
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
                this.isLoading = true;
                return axios.get(GET_REPORT_URL(this.id))
                    .then(({ data }) => {
                        this.chartData = { ...data };
                        this.updateChart();
                        this.isLoading = false;
                    })
                    .catch(() => {
                        this.isLoading = false;
                    });
            },

            runAudit() {
                this.isLoading = true;
                axios.post(CREATE_REPORT_URL(this.id))
                    .then(() => {
                        return this.loadData();
                    })
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
            this.buildChart();
            this.loadData();
        },
    };
</script>
