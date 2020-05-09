<template>
    <div class='site-overview'
            v-inview:enter="loadData">
        <project-settings v-if="showSettings"
                :id="id"
                @close="onSettingsClosed"/>

        <div class='site-overview--title'>
            <site-title :is_favorite="is_favorite">
                <v-btn text
                        color="text"
                        :to="`/projects/${id}`">{{ name }}
                </v-btn>
            </site-title>
            <site-overview-menu
                    :entries="menuEntries"
                    @openSettings="openSettings"
                    @removePage="removePage"
                    @openInfo="openInfo"
                    @runAudit="runAudit"/>
        </div>

        <div class='site-overview--content'>
            <span v-if="runError">{{ runError.message }}</span>
            <line-chart
                    v-else
                    :data-sets="datasets"
                    :labels="labels"/>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { customProjectMenuEntries } from '../../../../../../config/dashboard';
    import reportsToLineChart from '../../../../../../src/transformer/reports-to-line-chart';
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
                return customProjectMenuEntries.map((entry) => {
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
    };
</script>
