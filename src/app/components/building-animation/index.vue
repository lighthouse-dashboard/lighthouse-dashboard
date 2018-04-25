<template>
    <div class="building-animation">
        <div class="loader" :style="{ width: width, height: width}">
            <span class="loader-inner"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: Number,
                default: 10,
            },
        },

        computed: {
            width() {
                return `${ this.size }px`;
            },
        },
    };
</script>
