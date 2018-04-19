<template>
    <Card>
        <span slot="title">{{ $t(`message.category_${category}`) }}</span>

        {{buildScore}}

        <span class="right" :class="color">
            <i class="material-icons">{{icon}}</i> <small v-if="trendScore !== 0">{{trendScore}}</small>
        </span>
    </Card>
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
                required: true
            },

            username: {
                type: String,
                required: true
            },

            project: {
                type: String,
                required: true
            },

            category: {
                type: String,
                required: true
            },

            trendScore: {
                type: Number,
                required: true
            },
            buildScore: {
                type: Number,
                required: true
            },
        },

        computed: {
            icon() {
                if (this.trendScore > 0) {
                    return 'arrow_upward';
                }

                if (this.trendScore < 0) {
                    return 'arrow_downward';
                }

                return '';
            },

            color() {
                if (this.trendScore > 0) {
                    return 'green-text';
                }

                if (this.trendScore < 0) {
                    return 'red-text';
                }

                return '';
            }
        }

    };
</script>
