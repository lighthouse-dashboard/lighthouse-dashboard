<template>
    <small class="score"
           v-if="buildscore"
           :class="color"
    >
        {{ roundedScore }}
        <i class="material-icons tiny" v-if="trendscore && trendscore > 0">trending_up</i>
        <i class="material-icons tiny" v-if="trendscore && trendscore < 0">trending_down</i>
        <small v-if="trendscore">{{ trendscore }}</small>
    </small>
</template>

<script>

    export default {
        props: {

            category: {
                type: String,
                required: true,
            },

            trendscore: {
                type: Number,
                required: false,
                default: null,
            },

            buildscore: {
                type: Number,
                default: null,
            },

            budgetscore: {
                type: [Number, Boolean],
                required: false,
                default: false,
            },
        },

        computed: {
            roundedScore() {
                return Math.round(this.buildscore * 100) / 100;
            },
            icon() {
                if (this.trendscore === null) {
                    return '';
                }

                if (this.trendscore > 0) {
                    return 'arrow_upward';
                }

                if (this.trendscore < 0) {
                    return 'arrow_downward';
                }

                return '';
            },

            color() {
                if (this.trendscore === null) {
                    return '';
                }

                if (this.trendscore > 0) {
                    return 'green-text';
                }

                if (this.trendscore < 0) {
                    return 'red-text';
                }

                return '';
            },
        },
    };
</script>
