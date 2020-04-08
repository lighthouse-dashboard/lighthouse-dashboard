<template>
    <v-card>
        <project-settings v-if="showSettings"
                :id="id"
                @close="onSettingsClosed"/>

        <v-card-title>
            <site-title :is-favorite="isFavorite">
                <router-link :to="`/project/${id}`">{{ name }}</router-link>
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
            <line-chart :data-sets="datasets"
                    :labels="labels"/>
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
    import { mapActions } from 'vuex';
    import { PROJECT_MENU_CUSTOM_ENTRIES } from '../../../../../config/dashboard';
    import reportsToLineChart from '../../../../../src/transformer/reports-to-line-chart';
    import LineChart from '../charts/line-chart/line-chart';
    import ProjectSettings from '../site-settings/site-settings';
    import SiteTitle from '../site-title/site-title';
    import SiteOverviewMenu from './site-overview-menu';

    export default {
        components: {
            LineChart,
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
                datasets: [],
                labels: [],
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

            loadData() {
                this.isLoading = true;
                return this.fetchReportsForSite({ id: this.id })
                    .then(data => reportsToLineChart(data))
                    .then(({ datasets, labels }) => {
                        this.datasets = datasets;
                        this.labels = labels;
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
            this.loadData();
        },
    };
</script>
