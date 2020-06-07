<template>
    <tile class='site-overview'>
        <scheduled-job-indicator v-if="scheduled_jobs > 0"/>
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
    import bemMixin from '../../mixins/bem-mixin';
    import Btn from '../base/btn/btn';
    import LineChart from '../charts/line-chart/line-chart';
    import ScheduledJobIndicator from '../scheduled-job-indicator/scheduled-job-indicator';
    import ProjectSettings from '../site-settings/site-settings';
    import Tile from '../tile/tile';

    export default {
        components: {
            ScheduledJobIndicator,
            Tile,
            Btn,
            LineChart,
            ProjectSettings,
        },

        mixins: [bemMixin('site-overview')],

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

            scheduled_jobs: {
                type: Number,
                default: 0,
            },

            /** @type {Reports.Report[]} */
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
                /** @type {Error | null} */
                runError: null,
                interval: null,
            };
        },
        computed: {
            rootClasses() {
                return [
                    this.createIfFacet(this.scheduled_jobs, 'has-scheduled-jobs'),
                ];
            },

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
