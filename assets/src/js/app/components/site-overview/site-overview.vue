<template>
    <tile class='site-overview'>
        <div class='site-overview--title'
                slot="title">
            <btn :to="{name: 'project.detail', params: {id}}"
                    class="subtitle1"
                    facets="flat">
                {{ name }}
            </btn>
        </div>

        <span title="Created At"
                class="u-reset caption"
                v-if="latestReport"
                slot="caption">
            {{ latestReport | format-date }}
        </span>

        <project-settings v-if="showSettings"
                :id="id"
                @close="onSettingsClosed"/>

        <div class='site-overview--content'>
            <span v-if="runError">{{ runError.message }}</span>
            <line-chart
                    :data-sets="lineChartData.datasets"
                    :labels="lineChartData.labels"/>
        </div>
    </tile>
</template>

<script>
    import { mapActions } from 'vuex';
    import { customProjectMenuEntries } from '../../../../../../config/dashboard';
    import reportsToLineChart from '../../../../../../src/transformer/reports-to-line-chart';
    import Btn from '../base/btn/btn';
    import LineChart from '../charts/line-chart/line-chart';
    import ProjectSettings from '../site-settings/site-settings';
    import Tile from '../tile/tile';

    export default {
        components: {
            Tile,
            Btn,
            LineChart,
            ProjectSettings,
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

            /** @type {Report[]} */
            reports: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                showSettings: false,
                showInfo: false,
                chart: null,

                isLoading: false,
                runError: null,
                interval: null,
            };
        },
        computed: {
            latestReport() {
                if (!this.reports || this.reports.length === 0) {
                    return null;
                }

                return [...this.reports].shift().createdAt;
            },

            menuEntries() {
                return customProjectMenuEntries.map((entry) => {
                    return {
                        name: entry.name,
                        link: entry.link(this.url),
                    };
                });
            },
            lineChartData() {
                return reportsToLineChart(this.reports);
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
