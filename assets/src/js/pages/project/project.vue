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
                <v-card>
                    <v-card-title>History</v-card-title>
                    <v-card-text>
                        <line-chart :data-sets="lineChartData.datasets"
                                :labels="lineChartData.labels"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';
    import reportsToLineChart from '../../../../../src/transformer/reports-to-line-chart';
    import LineChart from '../../components/charts/line-chart/line-chart';
    import ReportList from '../../components/report-list/report-list';
    import SiteConfig from '../../components/site-config/site-config';

    export default {
        components: {
            SiteConfig,
            LineChart,
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


        computed: {
            lineChartData() {
                return reportsToLineChart(this.reports);
            },
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
