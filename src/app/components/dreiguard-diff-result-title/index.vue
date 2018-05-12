<template>
    <div class="row">
        <div class="col s12">
            <i class="material-icons small red-text" v-if="comparison.diff.percentage >= maxDiff">warning</i>
            {{ comparison.capability.os }}
            {{ comparison.capability.os_version }}
            {{ comparison.capability.browserName }}
            {{ comparison.capability.browser_version }}
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: {
            comparison: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                maxDiff: Vue.config.diffAlerts,
            };
        },
    };
</script>
