<template>
    <div class="report-detail">
        <loading-indicator v-if="isLoading"/>
        <radar-chart :series="chartData.series"
                :labels="chartData.labels"
                v-if="report"/>
    </div>
</template>

<script>
    import reportToRadarChart from '../../utils/report-to-radar-chart';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import RadarChart from '../charts/radar-chart/radar-chart';

    export default {
        components: { LoadingIndicator, RadarChart },
        props: {
            /** @type {Reports.Report} */
            report: {
                type: Object,
                default: null,
            },
            isLoading: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            chartData() {
                return reportToRadarChart(this.report);
            },
        },
    };
</script>
