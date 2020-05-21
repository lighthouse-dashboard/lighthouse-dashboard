<template>
    <div class='project'>
        <h4 class='h4 project--title'
                v-if="site">
            {{ site.name }}
        </h4>

        <div class='project--content'>
            <div class='project--insights'>
                <div class='project--overview'>
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
                </div>

                <tile>
                    <report-history :reports='reports'/>
                </tile>
            </div>
            <div class='project--sidebar'>
                <tile title="Settings">
                    <loading-indicator v-if='isLoading'/>
                    <site-config :site="site"
                            v-if='site'/>
                </tile>

                <btn :facets="['secondary', 'full-width']"
                        @click="runAudit">New audit
                </btn>

                <tile title='Tools'>
                    <site-actions-list v-if='site'
                            :url='site.url'/>
                </tile>

                <tile title='HTML Reports'>
                    <audit-report-list :reports='reports'/>
                </tile>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import AuditReportList from '../../components/audit-report-list/audit-report-list';
    import Btn from '../../components/base/btn/btn';
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';
    import GaugeChart from '../../components/charts/gauge-chart/gauge-chart';
    import RadarChart from '../../components/charts/radar-chart/radar-chart';
    import ReportHistory from '../../components/report-history/report-history';
    import SiteActionsList from '../../components/site-actions-list/site-actions-list';
    import SiteConfig from '../../components/site-config/site-config';
    import Tile from '../../components/tile/tile';
    import getAverageForScore from '../../utils/get-average-for-score';
    import reportToRadarChart from '../../utils/report-to-radar-chart';

    export default {
        components: {
            AuditReportList,
            SiteActionsList,
            LoadingIndicator,
            Btn,
            RadarChart,
            Tile,
            GaugeChart,
            ReportHistory,
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
            ...mapActions('reports', ['launchAuditForSite']),

            getAvg(scoreId) {
                return Math.round(getAverageForScore(this.reports, scoreId.toLocaleLowerCase()) * 100) / 100;
            },

            runAudit() {
                return this.launchAuditForSite({ id: this.id });
            },
        },
    };
</script>
