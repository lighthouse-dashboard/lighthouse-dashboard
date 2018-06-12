<template>
    <small :class="color">
        {{ buildscore }}
        <small v-if="budgetscore" :title="$t('message.budget')">/ {{ budgetscore }}</small>
    </small>
</template>

<script>

    export default {
        props: {

            category: {
                type: String,
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

            color() {
                if (!this.budgetscore) {
                    return '';
                }

                if (this.buildscore >= this.budgetscore) {
                    return 'green-text';
                }

                if (this.buildscore < this.budgetscore) {
                    return 'red-text';
                }

                return '';
            },
        },
    };
</script>
