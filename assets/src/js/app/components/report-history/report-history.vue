<template>
    <tile title="History">
        <loading-indicator v-if='isLoading'/>
        <line-chart :data-sets="lineChartData.datasets"
                :labels="lineChartData.labels"
                v-else/>
    </tile>
</template>

<script>
    import reportsToLineChart from '../../../../../../src/transformer/reports-to-line-chart';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import LineChart from '../charts/line-chart/line-chart';
    import Tile from '../tile/tile';

    export default {
        components: { LoadingIndicator, Tile, LineChart },
        props: {
            /** @type {Report[]} */
            reports: {
                type: Array,
                required: true,
            },
            isLoading: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            lineChartData() {
                return reportsToLineChart(this.reports);
            },
        },
    };
</script>
