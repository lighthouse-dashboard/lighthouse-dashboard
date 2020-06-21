<template>
    <tile title="Latest Report"
            class="project--last-report-radar">
        <loading-indicator v-if="isLoading"/>
        <radar-chart :series="latestReportRadarData.series"
                :labels="latestReportRadarData.labels"
                v-if="latestReportRadarData"/>
    </tile>
</template>

<script>
    import reportToRadarChart from '../../utils/report-to-radar-chart';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import RadarChart from '../charts/radar-chart/radar-chart';
    import Tile from '../tile/tile';

    export default {
        components: { RadarChart, LoadingIndicator, Tile },
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
                return reportToRadarChart(this.currentReport);
            },
        },
    };
</script>
