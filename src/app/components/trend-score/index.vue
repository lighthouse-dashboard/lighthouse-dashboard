<template>
    <div :title="buildscore+'/'+budgetscore">
        <span :class="scorecolor">{{ buildscore }}</span>
        <span v-if="trendscore !== 0" :class="color">
            <i class="material-icons tiny" v-if="trendscore > 0">trending_up</i>
            <i class="material-icons tiny" v-if="trendscore < 0">trending_down</i>
            <small>{{ trendscore }}</small>
        </span>
    </div>
</template>

<script>

    export default {
        props: {

            vcs: {
                type: String,
                required: true,
            },

            username: {
                type: String,
                required: true,
            },

            project: {
                type: String,
                required: true,
            },

            category: {
                type: String,
                required: true,
            },

            trendscore: {
                type: Number,
                required: true,
            },

            buildscore: {
                type: Number,
                required: true,
            },

            budgetscore: {
                type: [Number, Boolean],
                required: false,
                default: false,
            },
        },

        computed: {
            icon() {
                if (this.trendscore > 0) {
                    return 'arrow_upward';
                }

                if (this.trendscore < 0) {
                    return 'arrow_downward';
                }

                return '';
            },

            color() {
                if (this.trendscore > 0) {
                    return 'green-text';
                }

                if (this.trendscore < 0) {
                    return 'red-text';
                }

                return '';
            },

            scorecolor() {

                if (!this.budgetscore) {
                    return null;
                }

                if (this.buildscore < this.budgetscore) {
                    return 'red-text';
                }

                return null;
            },
        },
    };
</script>
