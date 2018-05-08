<template>
    <span>
        {{ buildCompletedTime }}
    </span>
</template>

<script>

    import Vue from 'vue';
    import moment from 'moment';

    export default {
        props: {
            stopTime: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                buildCompletedTime: null,
            };
        },

        mounted() {
            const mStopTime = moment(this.stopTime);
            this.buildCompletedTime = mStopTime.format(Vue.config.dateFormat);
        },
    };
</script>
