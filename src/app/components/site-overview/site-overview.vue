<template>
    <div>
        <v-card-title>
            <v-icon v-if="is_favorite">mdi-star</v-icon>
            <v-icon v-else>mdi-star-outline</v-icon>
            {{ id }}
            <v-spacer/>
            <site-overview-menu
                    @removePage="removePage"
                    @runAudit="runAudit"/>
        </v-card-title>

        <v-card-text>
            <div ref="chart"/>
        </v-card-text>

        <v-card-actions>
            <span v-if="runError">{{ runError.message }}</span>
            <v-progress-circular
                    indeterminate
                    v-if="isLoading"
            />
        </v-card-actions>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import { mapActions, mapState } from 'vuex';
    import { SITE_OVERVIEW_CHART } from '../../config/chart-options';
    import SiteOverviewMenu from './site-overview-menu';

    export default {
        components: {
            SiteOverviewMenu,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
            is_favorite: {
                type: Boolean,
                required: true,
            },
            token: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                chart: null,
                chartData: {
                    datasets: [],
                    labels: [],
                },
                isLoading: false,
                runError: null,
            };
        },
        computed: {
            ...mapState('login', ['jwt']),
        },
        methods: {
            ...mapActions('reports', ['fetchReportsForSite', 'launchAuditForSite']),
            ...mapActions('sites', ['deleteSite']),

            buildChart() {
                const options = Object.assign({}, SITE_OVERVIEW_CHART, {});
                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();
            },

            updateChart() {
                this.chart.updateOptions({
                    xaxis: {
                        categories: this.chartData.labels,
                    },
                });
                this.chart.updateSeries(this.chartData.datasets);
            },

            async loadData() {
                this.isLoading = true;
                this.chartData = await this.fetchReportsForSite({ siteId: this.id });
                this.updateChart();
                this.isLoading = false;
            },

            async runAudit() {
                this.isLoading = true;
                await this.launchAuditForSite({ siteId: this.id, token: this.token });
                return this.loadData();
            },

            async removePage() {
                await this.deleteSite({ siteId: this.id });
            },
        },
        mounted() {
            this.buildChart();
            this.loadData();
        },
    };
</script>

<style>
    .apexcharts-canvas.apexcharts-canvas {
        background-color: transparent;
    }
</style>
