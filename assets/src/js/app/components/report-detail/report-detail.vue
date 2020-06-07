<template>
    <div class="report-detail"
            v-if="report">
        <radar-chart :series="chartData.series"
                :labels="chartData.labels"/>
    </div>
</template>

<script>
    import reportToRadarChart from '../../utils/report-to-radar-chart';
    import RadarChart from '../charts/radar-chart/radar-chart';

    export default {
        components: { RadarChart },
        props: {
            /** @type {Reports.Report} */
            report: {
                type: Object,
                default: null,
            },
        },
        computed: {
            chartData() {
                return reportToRadarChart(this.report);
            },
        },
    };
</script>
