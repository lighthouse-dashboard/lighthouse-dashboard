<template>
    <tile title="History">
        <line-chart :data-sets="lineChartData.datasets"
                :labels="lineChartData.labels"/>
    </tile>
</template>

<script>
    import reportsToLineChart from '../../../../../../src/transformer/reports-to-line-chart';
    import LineChart from '../charts/line-chart/line-chart';
    import Tile from '../tile/tile';

    export default {
        components: { Tile, LineChart },
        props: {
            /** @type {Report[]} */
            list: {
                type: Array,
                required: true,
            },
        },

        computed: {
            lineChartData() {
                return reportsToLineChart(this.list);
            },
        },
    };
</script>
