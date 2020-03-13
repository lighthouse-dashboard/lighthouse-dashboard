<template>
    <v-container>
        <v-row>
            <v-col cols="9">
                <report-list :list="reports"/>
            </v-col>

            <v-col cols="3">
                <site-config
                        :config="siteConfig"
                        v-if="siteConfig"/>

                <report-history :list="reports"/>

                <audit-report-list :list="reports"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';
    import AuditReportList from '../../components/audit-report-list/audit-report-list';
    import ReportHistory from '../../components/report-history/report-history';
    import ReportList from '../../components/report-list/report-list';
    import SiteConfig from '../../components/site-config/site-config';

    export default {
        components: {
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
