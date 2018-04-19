<template>
    <div>
        <span >{{ buildscore }}</span>
        <small v-if="trendscore !== 0" :class="color" >{{ trendscore }}</small>
    </div>
</template>

<script>

    import Card from '@/components/cards/Card';

    export default {
        components: {
            Card,
        },
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
        },
    };
</script>
