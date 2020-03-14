<template>
    <v-card>
        <v-card-title>
            {{ scoreId }}
        </v-card-title>

        <v-card-subtitle>
            Average
        </v-card-subtitle>

        <v-card-text>
            <gauge-chart :labels="['']"
                    :series="[avg]"/>
        </v-card-text>
    </v-card>
</template>

<script>
    import getAverageForScore from '../../utils/get-average-for-score';
    import GaugeChart from '../charts/gauge-chart/gauge-chart';

    export default {
        components: { GaugeChart },
        props: {
            scoreId: {
                type: String,
                required: true,
            },

            /** @type {Report[]} */
            list: {
                type: Array,
                required: true,
            },
        },

        computed: {
            avg() {
                return Math.round(getAverageForScore(this.list, this.scoreId) * 100) / 100;
            },
        },
    };
</script>
