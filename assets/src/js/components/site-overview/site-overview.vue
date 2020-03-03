<template>
    <v-card flat>
        <project-settings v-if="showSettings"
                :id="id"
                @close="onSettingsClosed"/>

        <v-card-title>
            <site-title :is-favorite="isFavorite">
                {{ name }}
            </site-title>
            <v-spacer/>
            <site-overview-menu
                    :entries="menuEntries"
                    @openSettings="openSettings"
                    @removePage="removePage"
                    @openInfo="openInfo"
                    @runAudit="runAudit"/>
        </v-card-title>

        <v-card-text>
            <div ref="chart"/>
        </v-card-text>

        <v-card-actions>
            <span v-if="runError">{{ runError.message }}</span>
            <v-progress-circular
                    indeterminate
                    v-if="isLoading"/>
        </v-card-actions>
    </v-card>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import { mapActions } from 'vuex';
    import CONFIG, { PROJECT_MENU_CUSTOM_ENTRIES } from '../../../../../config/dashboard';
    import { SITE_OVERVIEW_CHART } from '../../config/chart-options';
    import ProjectSettings from '../project-settings/project-settings';
    import SiteTitle from '../site-title/site-title';
    import SiteOverviewMenu from './site-overview-menu';

    export default {
        components: {
            SiteTitle,
            ProjectSettings,
            SiteOverviewMenu,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },

            isFavorite: {
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
                showSettings: false,
                showInfo: false,
                chart: null,
                chartData: {
                    datasets: [],
                    labels: [],
                },
                isLoading: false,
                runError: null,
                interval: null,
            };
        },
        computed: {
            menuEntries() {
                return PROJECT_MENU_CUSTOM_ENTRIES.map((entry) => {
                    return {
                        name: entry.name,
                        link: entry.link(this.url),
                    };
                });
            },
        },
        methods: {
            ...mapActions('reports', ['fetchReportsForSite', 'launchAuditForSite']),
            ...mapActions('sites', ['deleteSite']),

            onSettingsClosed() {
                this.showSettings = false;
            },

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

            loadData() {
                this.isLoading = true;
                return this.fetchReportsForSite({ id: this.id })
                    .then((data) => {
                        this.chartData = data;
                        this.updateChart();
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },

            runAudit() {
                this.isLoading = true;
                return this.launchAuditForSite({ id: this.id })
                    .then(() => {
                        return this.loadData();
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },

            async removePage() {
                await this.deleteSite({ id: this.id });
            },

            openSettings() {
                this.showSettings = !this.showSettings;
            },
            openInfo() {
                this.showInfo = !this.showInfo;
            },
        },

        beforeDestroy() {
            clearInterval(this.interval);
        },

        mounted() {
            this.buildChart();
            this.loadData();

            this.interval = setInterval(() => {
                this.loadData();
            }, CONFIG.DASHBOARD.UPDATE_INTERVAL);
        },
    };
</script>
