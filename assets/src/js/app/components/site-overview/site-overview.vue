<template>
    <tile
            :icon="icon"
            class="site-overview">
        <a class="link subtitle1"
                :href="`/app/projects/${id}`"
                slot="title">
            {{ name }}
        </a>

        <span :title="$t('general.created-at')"
                class="u-reset caption"
                v-if="latestReport"
                slot="caption">
            {{ latestReport | format-date }}
        </span>

        <div class="site-overview--content">
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
    import bemMixin from '../../mixins/bem-mixin';
    import inViewMixin from '../../mixins/in-view-mixin';
    import reportsToLineChart from '../../utils/reports-to-line-chart';
    import LineChart from '../charts/line-chart/line-chart';
    import Tile from '../tile/tile';

    export default {
        components: {
            Tile,
            LineChart,
        },

        mixins: [bemMixin('site-overview'), inViewMixin()],

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
                default: false,
            },

            is_scheduled: {
                type: Boolean,
                default: false,
            },

            is_disabled: {
                type: Boolean,
                default: false,
            },

            /** @type {Reports.Report[]} */
            reports: {
                type: Array,
                required: true,
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
            icon() {
                switch (true) {
                    case this.is_disabled:
                        return 'ban';
                    case this.is_scheduled:
                        return 'search';
                    case this.is_favorite:
                        return 'heart';
                    default:
                        return null;
                }
            },
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
