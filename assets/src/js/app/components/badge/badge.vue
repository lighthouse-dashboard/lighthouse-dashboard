<template>
    <span class="badge" v-if="counter">{{ formattedCounter }}</span>
</template>

<script>
export default {
    props: {
        counter: {
            type: [String, Number],
            default: null,
        },
    },
    computed: {
        formattedCounter() {
            if (Number.isNaN( this.counter )) {
                return this.counter;
            }
            const c = parseInt( this.counter );
            return this.formatCounter( c );
        },
    },
    methods: {
        formatCounter(counter) {
            return counter > 99 ? `99+` : counter;
        },
    },
};
</script>
