<template>
    <div>
        <v-toolbar color="transparent"
                flat
                dense
                v-if="currentSiteConfig">
            <v-toolbar-title>
                {{ currentSiteConfig.name }}
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon
                    title="Schedule new audit"
                    @click="runAudit">
                <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-btn icon
                    title="Edit settings"
                    @click="toggleEdit">
                <v-icon>mdi-tune</v-icon>
            </v-btn>
        </v-toolbar>

        <v-container fluid>
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

        <project-settings v-if="isEdit"
                :id="id"
                @close="onCloseSettings"/>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import AuditReportList from '../../components/audit-report-list/audit-report-list';
    import ProjectSettings from '../../components/site-settings/site-settings';
    import ReportHistory from '../../components/report-history/report-history';
    import ReportList from '../../components/report-table/report-table';
    import ReportsAverage from '../../components/reports-average/reports-average';
    import SiteActionsList from '../../components/site-actions-list/site-actions-list';
    import SiteConfig from '../../components/site-config/site-config';

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
