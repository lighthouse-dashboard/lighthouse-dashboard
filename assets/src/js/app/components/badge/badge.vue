<template>
    <div class="badge">
        <span
                class="badge--counter"
                v-if="counter">{{ counter }}</span>
        <slot/>
    </div>
</template>

<script>
    export default {
        props: {
            counter: {
                type: [String, Number],
                default: null,
            },
        },
    };
</script>
