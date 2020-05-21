<template>
    <div class='project'>
        <h4 class='h4 project--title'
                v-if="site">
            {{ site.name }}
        </h4>

        <div class='project--overview'
                v-if='site'>
            <tile title="Latest Report"
                    class="project--last-report-radar">
                <loading-indicator v-if='isLoading'/>
                <radar-chart :series="latestReportRadarData.series"
                        :labels="latestReportRadarData.labels"
                        v-if='latestReportRadarData'/>
            </tile>

            <tile title="Averages"
                    class="project--average">
                <loading-indicator v-if='isLoading'/>
                <gauge-chart :labels="avgFields"
                        :series='avgFields.map(field => getAvg(field))'
                        v-else/>
            </tile>

            <div>
                <tile title="Settings"
                        class="project--settings">
                    <loading-indicator v-if='isLoading'/>
                    <site-config :config="site"
                            v-if='site'/>
                </tile>

                <btn
                        class="project--audit-btn"
                        :facets="['secondary', 'full-width']"
                        @click="runAudit">New audit
                </btn>
            </div>
        </div>

        <div class="project--content">
            <report-history :id='id'/>
            <report-table :id='id'/>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Btn from '../../components/base/btn/btn';
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';
    import GaugeChart from '../../components/charts/gauge-chart/gauge-chart';
    import RadarChart from '../../components/charts/radar-chart/radar-chart';
    import ReportHistory from '../../components/report-history/report-history';
    import ReportTable from '../../components/report-table/report-table';
    import SiteConfig from '../../components/site-config/site-config';
    import Tile from '../../components/tile/tile';
    import withReports from '../../containers/with-reports';
    import getAverageForScore from '../../utils/get-average-for-score';
    import reportToRadarChart from '../../utils/report-to-radar-chart';

    export default {
        components: {
            LoadingIndicator,
            Btn,
            ReportTable: withReports(ReportTable),
            RadarChart,
            Tile,
            GaugeChart,
            ReportHistory: withReports(ReportHistory),
            SiteConfig,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
            reports: {
                type: Array,
                default: () => [],
            },
            isLoading: {
                type: Boolean,
                default: false,
            },
            site: {
                type: Object,
                default: null,
            },
        },

        data() {
            return {
                isEdit: false,
                avgFields: ['Performance', 'SEO', 'Accessibility'],
            };
        },

        computed: {
            latestReport() {
                return this.reports[0];
            },

            latestReportRadarData() {
                if (!this.latestReport) {
                    return null;
                }
                return reportToRadarChart(this.latestReport);
            },
        },

        methods: {
            ...mapActions('sites', ['getCurrentSite', 'resetCurrentSite']),
            ...mapActions('reports', ['launchAuditForSite']),

            /**
             *
             * @param {string} scoreId
             * @return {number}
             */
            getAvg(scoreId) {
                return Math.round(getAverageForScore(this.reports, scoreId.toLocaleLowerCase()) * 100) / 100;
            },

            runAudit() {
                return this.launchAuditForSite({ id: this.id });
            },
        },

        beforeDestroy() {
            this.resetCurrentSite();
        },
    };
</script>
