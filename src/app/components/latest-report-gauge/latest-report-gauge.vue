<template>
    <div class="single-radial-bar">
        <div ref="chart"/>
    </div>
</template>


<script>
    import ApexCharts from 'apexcharts';
    import { mapActions } from 'vuex';
    import { GAUGE_CHART } from '../../config/chart-options';

    export default {
        props: {
            id: {
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
            ...mapActions('reports', ['fetchLatestReportForSite']),

            buildChart() {
                var options = Object.assign({}, GAUGE_CHART, {
                    title: {
                        text: this.id,
                        style: {
                            fontSize: '16px',
                            color: '#fff',
                        },
                    },
                    series: [0],
                    labels: this.valueIds,
                });
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
            },


            async loadData() {
                const data = await this.fetchLatestReportForSite({ siteId: this.id });
                this.chart.updateOptions({
                    labels: data.labels,
                });
                this.chart.updateSeries(data.series);
            },
        },
        mounted() {
            this.buildChart();
            this.loadData();
        },
    };
</script>
