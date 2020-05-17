<template>
    <div class="reports-chart">
        <line-chart :data-sets="series"
                :options="{  chart: {height: 100}}"
                :labels="labels"/>
    </div>
</template>

<script>
    import { getReportValueScoreByKey } from '../../../../../../src/utils/get-report-value-score-by-key';
    import formatDate from '../../filters/format-date';
    import LineChart from '../charts/line-chart/line-chart';

    export default {
        components: { LineChart },
        props: {
            /** @type {Report[]} */
            reports: {
                type: Array,
                required: true,
            },
        },

        computed: {
            series() {
                return [
                    {
                        name: 'Performance',
                        data: this.reports.map((report) => {
                            return getReportValueScoreByKey(report.values, 'performance');
                        }),
                    },
                ];
            },

            labels() {
                return this.reports.map((report) => {
                    return formatDate(report.createdAt);
                });
            },
        },
    };
</script>
