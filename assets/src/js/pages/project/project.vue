<template>
    <v-container>
        <v-row v-if="currentSiteConfig">
            <v-col cols="9">
                <h1>{{ currentSiteConfig.name }}</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="9">
                <v-row>
                    <v-col>
                        <reports-average :list="reports"
                                score-id="performance"/>
                    </v-col>
                    <v-col>
                        <reports-average :list="reports"
                                score-id="seo"/>
                    </v-col>
                    <v-col>
                        <reports-average :list="reports"
                                score-id="accessibility"/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <report-list :list="reports"/>
                    </v-col>
                    <v-col cols="12">
                        <site-audit-btn :id="id"/>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="3">
                <v-row>
                    <v-col cols="12"
                            v-if="currentSiteConfig">
                        <site-config
                                :config="currentSiteConfig"/>
                    </v-col>

                    <v-col cols="12">
                        <report-history :list="reports"/>
                    </v-col>


                    <v-col cols="12"
                            v-if="currentSiteConfig">
                        <site-actions-list :url="currentSiteConfig.url"/>
                    </v-col>


                    <v-col cols="12">
                        <audit-report-list :list="reports"/>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import AuditReportList from '../../components/audit-report-list/audit-report-list';
    import ReportHistory from '../../components/report-history/report-history';
    import ReportList from '../../components/report-table/report-table';
    import ReportsAverage from '../../components/reports-average/reports-average';
    import SiteActionsList from '../../components/site-actions-list/site-actions-list';
    import SiteAuditBtn from '../../components/site-audit-btn/site-audit-btn';
    import SiteConfig from '../../components/site-config/site-config';

    export default {
        components: {
            SiteActionsList,
            ReportsAverage,
            SiteAuditBtn,
            ReportHistory,
            AuditReportList,
            SiteConfig,
            ReportList,
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
            };
        },

        computed: {
            ...mapState('sites', ['currentSiteConfig']),
        },

        methods: {
            ...mapActions('reports', ['fetchReportsForSite']),
            ...mapActions('sites', ['getCurrentSite']),

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

        mounted() {
            this.loadReports();
            this.loadSiteInfo();
        },
    };
</script>
