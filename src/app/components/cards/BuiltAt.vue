<template>
    <Card>
        <span slot="title">{{ $t('message.build_completed') }}</span>
        {{ buildCompletedTime }}
    </Card>
</template>

<script>

    import Vue from 'vue';
    import moment from 'moment';

    import Card from '@/components/cards/Card';

    export default {
        components: {
            Card,
        },

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
