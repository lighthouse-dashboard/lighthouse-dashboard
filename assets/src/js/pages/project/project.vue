<template>
    <v-container>
        <v-row>
            <v-col cols="9">
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
                    <v-col cols="12">
                        <site-config
                                :config="siteConfig"
                                v-if="siteConfig"/>
                    </v-col>

                    <v-col cols="12">
                        <report-history :list="reports"/>
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
    import { mapActions } from 'vuex';
    import AuditReportList from '../../components/audit-report-list/audit-report-list';
    import ReportHistory from '../../components/report-history/report-history';
    import ReportList from '../../components/report-table/report-table';
    import SiteAuditBtn from '../../components/site-audit-btn/site-audit-btn';
    import SiteConfig from '../../components/site-config/site-config';

    export default {
        components: {
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
                /** @type {SiteConfig | null} */
                siteConfig: null,
            };
        },


        methods: {
            ...mapActions('reports', ['fetchReportsForSite']),
            ...mapActions('sites', ['getSite']),

            loadSiteInfo() {
                return this.getSite({ siteId: this.id })
                    .then((data) => {
                        this.siteConfig = data;
                    });
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
