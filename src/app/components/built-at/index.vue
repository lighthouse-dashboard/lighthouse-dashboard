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
            const now = moment();

            if (now.diff(mStopTime, 'hours') < 12) {
                this.buildCompletedTime = mStopTime.fromNow();
            } else {
                this.buildCompletedTime = mStopTime.format(Vue.config.dateFormat);
            }
        },
    };
</script>
