<template>
    <div class="row dreiguard-diff-result">
        <div class="col s12 m6">
            <img class="responsive-img dreiguard-diff-result__image" :src="comparison.screenshot"/>
            {{ $t("message.screenshot") }}
        </div>

        <div class="col s12 m6">
            <img class="responsive-img dreiguard-diff-result__image" :src="comparison.diff.diffFile"/>
            {{ $t("message.diffimage") }}
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
