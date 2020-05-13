<template>
    <div>
        <v-card-title>History</v-card-title>
        <v-card-text>
            <line-chart :data-sets="lineChartData.datasets"
                    :labels="lineChartData.labels"/>
        </v-card-text>
    </div>
</template>

<script>
    import reportsToLineChart from '../../../../../../src/transformer/reports-to-line-chart';
    import LineChart from '../charts/line-chart/line-chart';

    export default {
        components: { LineChart },
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
