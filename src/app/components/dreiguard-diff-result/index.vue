<template>
    <div class="row dreiguard-diff-result">
        <div class="col s12">
            <img class="responsive-img dreiguard-diff-result__image" :src="comparison.screenshot"/>
        </div>

        <div class="col s12">
            <i class="material-icons small" v-if="comparison.diff.percentage >= maxDiff">warning</i>
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
