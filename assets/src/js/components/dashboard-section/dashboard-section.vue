<template>
    <div class="dashboard-section">
        <component :is="componentProps.is"/>
    </div>
</template>

<script>

    export default {
        components: {},

        props: {
            type: {
                type: String,
                required: true,
            },
        },

        computed: {
            componentProps() {
                return {
                    is: this.type,
                };
            },
        },
    };
</script>
