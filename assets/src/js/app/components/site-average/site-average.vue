<template>
    <tile :title="$t('average.label')"
            class="project--average">
        <loading-indicator v-if="isLoading"/>
        <gauge-chart :labels="avgFields"
                :series="avgFields.map(field => getAvg(field))"
                v-else/>
    </tile>
</template>

<script>
    import getAverageForScore from '../../utils/get-average-for-score';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import GaugeChart from '../charts/gauge-chart/gauge-chart';
    import Tile from '../tile/tile';

    export default {
        components: { GaugeChart, LoadingIndicator, Tile },
        props: {
            reports: {
                type: Array,
                default: () => [],
            },
            isLoading: {
                type: Boolean,
                default: false,
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
