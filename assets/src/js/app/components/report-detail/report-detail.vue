<template>
    <div class="report-detail">
        <loading-indicator v-if="isLoading"/>
        <bar-chart :series="chartData.series"
                :labels="chartData.labels"/>
    </div>
</template>

<script>
    import reportToBarChart from '../../utils/report-to-bar-chart';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import BarChart from '../charts/bar-chart/bar-chart';

    export default {
        components: { BarChart, LoadingIndicator },
        props: {
            /** @type {Reports.Report} */
            report: {
                type: Object,
                default: null,
            },
            isLoading: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            chartData() {
                return reportToBarChart(this.report);
            },
        },
    };
</script>
