<template>
    <chart
            type="line"
            :config="config"
            :series="series"
            :labels="labels"/>
</template>

<script>
    import { getReportValueScoreByKey } from '../../../../../../src/utils/get-report-value-score-by-key';
    import { SITE_OVERVIEW_CHART } from '../../config/chart-options';
    import getAverageForScore from '../../utils/get-average-for-score';
    import Chart from '../charts/chart/chart';

    const getAvg = (reports, scoreId) => {
        return Math.round(getAverageForScore(reports, scoreId.toLocaleLowerCase()) * 100) / 100;
    };

    export default {
        components: { Chart },
        props: {
            reports: {
                type: Array,
                default: () => [],
            },
        },

        data: () => ({
            config: SITE_OVERVIEW_CHART,
            labels: ['Performance', 'Accessibility', 'Best Practices', 'SEO', 'PWA'],
        }),

        computed: {
            /** @type {Reports.Report} */
            lastReport() {
                return [...this.reports].shift();
            },

            otherReports() {
                const reports = [...this.reports];
                reports.shift();
                return reports;
            },

            series() {
                return [{
                    name: 'Latest Report',
                    type: 'bar',
                    data: [
                        getReportValueScoreByKey(this.lastReport.values, 'performance'),
                        getReportValueScoreByKey(this.lastReport.values, 'accessibility'),
                        getReportValueScoreByKey(this.lastReport.values, 'best-practices'),
                        getReportValueScoreByKey(this.lastReport.values, 'seo'),
                        getReportValueScoreByKey(this.lastReport.values, 'pwa'),
                    ],
                }, {
                    name: 'Average',
                    type: 'line',
                    data: [
                        getAvg(this.otherReports, 'performance'),
                        getAvg(this.otherReports, 'accessibility'),
                        getAvg(this.otherReports, 'best-practices'),
                        getAvg(this.otherReports, 'seo'),
                        getAvg(this.otherReports, 'pwa'),
                    ],
                }];
            },
        },

        methods: {},
    };
</script>
