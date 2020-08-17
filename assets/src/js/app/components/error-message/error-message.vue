<template>
    <div class="error-message"
            v-if="text">
        <p class="u-reset error-message--text">
            {{ text }}
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            /** @type {string | null} */
            message: {
                type: String,
                default: null,
            },

            /** @type {Error | null} */
            error: {
                type: Object,
                default: null,
            },
        },

        computed: {
            text() {
                if (this.message) {
                    return this.message;
                }
                if (this.error) {
                    return this.error.message;
                }
                return null;
            },
        },
    };
</script>
