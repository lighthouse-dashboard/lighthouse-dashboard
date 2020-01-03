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
            valueId: {
                type: String,
                default: 'performance'
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
                    series: [0],
                    labels: [this.id],
                });
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
            },


            async loadData() {
                const data = await this.fetchLatestReportForSite({ siteId: this.id });
                this.chart.updateSeries([this.getValue(data.values, this.valueId)]);
            },

            getValue(values, id) {
                return values.find(v => v.id === id).value;
            },
        },
        mounted() {
            this.buildChart();
            this.loadData();
        },
    };
</script>
