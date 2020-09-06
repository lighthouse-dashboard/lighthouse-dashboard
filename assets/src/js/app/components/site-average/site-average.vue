<template>
    <gauge-chart :labels="avgFields"
            :series="avgFields.map(field => getAvg(field))"/>
</template>

<script>
    import getAverageForScore from '../../utils/get-average-for-score';
    import GaugeChart from '../charts/gauge-chart/gauge-chart';

    export default {
        components: { GaugeChart },
        props: {
            reports: {
                type: Array,
                default: () => [],
            },
        },
        data: () => ({
            avgFields: ['Performance', 'SEO', 'Accessibility'],
        }),

        methods: {
            getAvg(scoreId) {
                return Math.round(getAverageForScore(this.reports, scoreId.toLocaleLowerCase()) * 100) / 100;
            },
        },
    };
</script>
