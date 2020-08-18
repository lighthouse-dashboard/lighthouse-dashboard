<template>
    <tile class="site-overview">
        <scheduled-job-indicator v-if="is_scheduled"/>
        <div class="site-overview--title"
                slot="title">
            <btn :to="`/app/projects/${id}`"
                    class="subtitle1"
                    facets="flat">
                {{ name }}
            </btn>
        </div>

        <span :title="$t('general.created-at')"
                class="u-reset caption"
                v-if="latestReport"
                slot="caption">
            {{ latestReport | format-date }}
        </span>

        <loading-indicator v-if="isLoading"/>

        <div class="site-overview--content"
                v-else>
            <span v-if="runError">
                {{ runError.message }}
            </span>
            <line-chart
                    :data-sets="lineChartData.datasets"
                    :labels="lineChartData.labels"/>
        </div>
    </tile>
</template>

<script>
    import { customProjectMenuEntries } from '../../../../../../config/dashboard';
    import reportsToLineChart from '../../utils/reports-to-line-chart';
    import bemMixin from '../../mixins/bem-mixin';
    import Btn from '../base/btn/btn';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import LineChart from '../charts/line-chart/line-chart';
    import ScheduledJobIndicator from '../scheduled-job-indicator/scheduled-job-indicator';
    import Tile from '../tile/tile';

    export default {
        components: {
            LoadingIndicator,
            ScheduledJobIndicator,
            Tile,
            Btn,
            LineChart,
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

            is_scheduled: {
                type: Boolean,
                default: false,
            },

            /** @type {Reports.Report[]} */
            reports: {
                type: Array,
                required: true,
            },

            isLoading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                chart: null,

                /** @type {Error | null} */
                runError: null,
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
    };
</script>
