<template>
    <div class='project'>
        <h4 class='h4 project--title'
                v-if="currentSiteConfig">{{ currentSiteConfig.name }}</h4>

        <div class="project--overview">
            <report-history
                    class='project--sidebar-item'
                    :list="reports"/>

            <tile title="Averages">
                <gauge-chart :labels="['Performance', 'SEO', 'Accessibility']"
                        :series='[getAvg("performance"), getAvg("seo"), getAvg("accessibility")]'/>
            </tile>
        </div>

        <div class='project--content'
                v-if="currentSiteConfig">
            <div>
                <report-list :list="reports"/>
            </div>

            <div class='project--sidebar'>
                <site-config
                        class='project--sidebar-item'
                        :config="currentSiteConfig"/>

                <site-actions-list
                        class='project--sidebar-item'
                        :url="currentSiteConfig.url"/>

                <audit-report-list
                        class='project--sidebar-item'
                        :list="reports"/>
            </div>
        </div>

        <project-settings v-if="isEdit"
                :id="id"
                @close="onCloseSettings"/>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import AuditReportList from '../../components/audit-report-list/audit-report-list';
    import GaugeChart from '../../components/charts/gauge-chart/gauge-chart';
    import ReportHistory from '../../components/report-history/report-history';
    import ReportList from '../../components/report-table/report-table';
    import ReportsAverage from '../../components/reports-average/reports-average';
    import SiteActionsList from '../../components/site-actions-list/site-actions-list';
    import SiteConfig from '../../components/site-config/site-config';
    import ProjectSettings from '../../components/site-settings/site-settings';
    import Tile from '../../components/tile/tile';
    import getAverageForScore from '../../utils/get-average-for-score';

    export default {
        components: {
            Tile,
            GaugeChart,
            SiteActionsList,
            ReportsAverage,
            ReportHistory,
            AuditReportList,
            SiteConfig,
            ReportList,
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

            toggleEdit() {
                this.isEdit = !this.isEdit;
            },

            onCloseSettings() {
                this.getCurrentSite({ siteId: this.config.id });
                this.toggleEdit();
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
