<template>
    <div class='project'>
        <h4 class='h4 project--title'
                v-if="currentSiteConfig">{{ currentSiteConfig.name }}</h4>

        <div class='project--overview'
                v-if="currentSiteConfig">
            <div>
                <tile title="Latest Report"
                        v-if="latestReport">
                    <radar-chart :series="latestReportRadarData.series"
                            :labels="latestReportRadarData.labels"/>
                </tile>
            </div>

            <tile title="Averages">
                <gauge-chart :labels="['Performance', 'SEO', 'Accessibility']"
                        :series='[getAvg("performance"), getAvg("seo"), getAvg("accessibility")]'/>
            </tile>

            <tile title="Settings">
                <site-config :config="currentSiteConfig"/>
            </tile>
        </div>

        <div class="project--content">
            <report-history :list="reports"/>
            <report-table :list="reports"/>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import GaugeChart from '../../components/charts/gauge-chart/gauge-chart';
    import RadarChart from '../../components/charts/radar-chart/radar-chart';
    import ReportHistory from '../../components/report-history/report-history';
    import ReportTable from '../../components/report-table/report-table';
    import SiteConfig from '../../components/site-config/site-config';
    import ProjectSettings from '../../components/site-settings/site-settings';
    import Tile from '../../components/tile/tile';
    import getAverageForScore from '../../utils/get-average-for-score';
    import reportToRadarChart from '../../utils/report-to-radar-chart';

    export default {
        components: {
            ReportTable,
            RadarChart,
            Tile,
            GaugeChart,
            ReportHistory,
            SiteConfig,
            ProjectSettings,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                reports: [],
                isEdit: false,
            };
        },

        computed: {
            ...mapState('sites', ['currentSiteConfig']),
            latestReport() {
                return this.reports[0];
            },
            latestReportRadarData() {
                return reportToRadarChart(this.latestReport);
            },
        },

        methods: {
            ...mapActions('sites', ['getCurrentSite', 'resetCurrentSite']),
            ...mapActions('reports', ['fetchReportsForSite', 'launchAuditForSite']),

            getAvg(scoreId) {
                return Math.round(getAverageForScore(this.reports, scoreId) * 100) / 100;
            },

            runAudit() {
                return this.launchAuditForSite({ id: this.id });
            },

            loadSiteInfo() {
                return this.getCurrentSite({ siteId: this.id });
            },

            loadReports() {
                return this.fetchReportsForSite({ id: this.id })
                    .then((data) => {
                        this.reports = data;
                    });
            },
        },

        beforeDestroy() {
            this.resetCurrentSite();
        },

        mounted() {
            this.loadReports();
            this.loadSiteInfo();
        },
    };
</script>
