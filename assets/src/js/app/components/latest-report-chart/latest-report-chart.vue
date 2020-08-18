<template>
    <tile :title="$t('latest-report.title')"
            class="project--last-report-radar">
        <loading-indicator v-if="isLoading"/>
        <bar-chart :series="latestReportRadarData.series"
                :labels="latestReportRadarData.labels"
                v-if="latestReportRadarData"/>
    </tile>
</template>

<script>
    import reportToBarChart from '../../utils/report-to-bar-chart';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import BarChart from '../charts/bar-chart/bar-chart';
    import Tile from '../tile/tile';

    export default {
        components: { BarChart, LoadingIndicator, Tile },
        props: {
            isLoading: {
                type: Boolean,
                default: false,
            },

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
