<template>
    <div class="loader-wrapper">
        <div class="loader" :style="{ width: width, height: width}">
            <span class="loader-inner"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: Number,
                default: 10
            }
        },

        computed: {
            width() {
                return `${this.size}px`;
            },
            margin() {

                return `-${this.size / 2}px`;
            }
        }
    }
</script>
