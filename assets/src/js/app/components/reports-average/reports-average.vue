<template>
    <div class='reports-average'>
        <p class='subtitle-1'>
            {{ title }}
        </p>

        <p class='caption'>
            Average
        </p>

        <gauge-chart :labels="['']"
                :series="[score]"/>
    </div>
</template>

<script>
    import GaugeChart from '../charts/gauge-chart/gauge-chart';

    export default {
        components: { GaugeChart },
        props: {
            title: {
                type: String,
                required: true,
            },

            score: {
                type: Number,
                required: true,
            },
        },
    };
</script>
