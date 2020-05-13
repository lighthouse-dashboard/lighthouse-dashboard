<template>
    <div class='project'>
        <p class='h4'>{{ currentSiteConfig.name }}</p>

        <div class='project--content'
                v-if="currentSiteConfig">
            <div>
                <div class='project--averages'>
                    <reports-average class='project--average-item'
                            title='Performance'
                            :score='getAvg("performance")'/>

                    <reports-average
                            class='project--average-item'
                            title='SEO'
                            :score='getAvg("seo")'/>

                    <reports-average
                            class='project--average-item'
                            title='Accessibility'
                            :score='getAvg("accessibility")'/>
                </div>
                <report-list :list="reports"/>
            </div>

            <div class='project--sidebar'>
                <site-config
                        class='project--sidebar-item'
                        :config="currentSiteConfig"/>

                <report-history
                        class='project--sidebar-item'
                        :list="reports"/>

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
    import ReportHistory from '../../components/report-history/report-history';
    import ReportList from '../../components/report-table/report-table';
    import ReportsAverage from '../../components/reports-average/reports-average';
    import SiteActionsList from '../../components/site-actions-list/site-actions-list';
    import SiteConfig from '../../components/site-config/site-config';
    import ProjectSettings from '../../components/site-settings/site-settings';
    import getAverageForScore from '../../utils/get-average-for-score';

    export default {
        components: {
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
