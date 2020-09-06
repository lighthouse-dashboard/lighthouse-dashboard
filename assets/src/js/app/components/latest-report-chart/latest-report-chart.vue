<template>
    <bar-chart :series="latestReportRadarData.series"
            :labels="latestReportRadarData.labels"
            v-if="latestReportRadarData"/>
</template>

<script>
    import reportToBarChart from '../../utils/report-to-bar-chart';
    import BarChart from '../charts/bar-chart/bar-chart';

    export default {
        components: { BarChart },
        props: {


            report: {
                type: Object,
                default: null,
            },
            reports: {
                type: Array,
                default: () => [],
            },
        },

        computed: {
            currentReport() {
                if (this.report) {
                    return this.report;
                }

                return this.reports[0];
            },
            latestReportRadarData() {
                if (!this.currentReport) {
                    return null;
                }
                return reportToBarChart(this.currentReport);
            },
        },
    };
</script>
