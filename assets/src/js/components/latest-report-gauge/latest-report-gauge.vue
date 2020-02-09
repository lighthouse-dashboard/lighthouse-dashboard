<template>
    <v-card flat>
        <v-card-title>
            <site-title :is_favorite="is_favorite">{{ name }}</site-title>
        </v-card-title>
        <v-card-text>
            <div ref="chart"/>

        </v-card-text>
    </v-card>
</template>


<script>
    import ApexCharts from 'apexcharts';
    import { mapActions } from 'vuex';
    import CONFIG from '../../../../../dashboard.config';
    import { GAUGE_CHART } from '../../config/chart-options';
    import SiteTitle from '../site-title/site-title';

    export default {
        components: { SiteTitle },
        props: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            is_favorite: {
                type: Boolean,
                required: true,
            },
        },

        data() {
            return {
                data: null,
                chart: null,
                chartData: null,
                isLoading: false,
                interval: null,
            };
        },
        methods: {
            ...mapActions('reports', ['fetchLatestReportForSite']),

            buildChart() {
                const options = Object.assign({}, GAUGE_CHART, {
                    series: [],
                    labels: [],
                });
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
            },


            loadData() {
                this.isLoading = true;
                this.fetchLatestReportForSite({ siteId: this.id })
                    .then((data) => {
                        this.data = data;
                        this.chart.updateOptions({
                            labels: data.labels,
                        });
                        this.chart.updateSeries(data.series);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        beforeDestroy() {
            clearInterval(this.interval);
        },

        mounted() {
            this.buildChart();
            this.loadData();

            this.interval = setInterval(() => {
                this.loadData();
            }, CONFIG.DASHBOARD.UPDATE_INTERVAL);
        },
    };
</script>
