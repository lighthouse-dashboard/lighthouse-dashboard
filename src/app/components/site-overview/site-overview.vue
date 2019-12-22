<template>
    <v-card>
        <v-card-title>
            {{ id }}
            <v-spacer/>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            dark
                            v-on="on"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>
                            Open Page
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="removePage">
                        <v-list-item-title>
                            Remove Site
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="runAudit">
                        <v-list-item-title>
                            Run New Audit
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>
        <v-card-text>
            <div ref="chart"/>
        </v-card-text>

        <v-card-actions>
            <span v-if="runError">{{ runError.message }}</span>
            <v-progress-circular
                    indeterminate
                    v-if="isLoading"
            />
        </v-card-actions>
    </v-card>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import axios from 'axios';
    import { SITE_OVERVIEW_CHART } from '../../config/chart-options';
    import { CREATE_REPORT_URL, GET_REPORT_URL, REMOVE_SITE_URL } from '../../config/routes';

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
                const options = Object.assign({}, SITE_OVERVIEW_CHART, {});
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

            removePage() {
                axios.delete(REMOVE_SITE_URL(this.id));
            },
        },
        mounted() {
            this.buildChart();
            this.loadData();
        },
    };
</script>

<style>
    .apexcharts-canvas.apexcharts-canvas {
        background-color: transparent;
    }
</style>
