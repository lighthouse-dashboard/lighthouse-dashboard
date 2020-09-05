<template>
    <tile class="site-report-tile">
        <template
                slot="title">
            <template v-if="is_disabled">
                &#x26D4;
            </template>

            <a class="latest-audits-feed--title-btn link"
                    :title="name"
                    :href="`/app/projects/${id}`">
                {{ name }}
            </a>
        </template>
        <span
                :title="$t('general-created-at')"
                class="u-reset caption latest-audits-feed--caption"
                slot="caption">
            {{ last_audit | format-date }}
        </span>
        <report-detail :report="report"/>
    </tile>
</template>

<script>
    import ReportDetail from '../report-detail/report-detail';
    import Tile from '../tile/tile';

    export default {
        components: { ReportDetail, Tile },
        props: {
            is_scheduled: {
                type: Boolean,
                default: false,
            },
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
            last_audit: {
                type: String,
                required: true,
            },
            is_disabled: {
                type: Boolean,
                default: false,
            },

            /** @type {Reports.Report} */
            report: {
                type: Object,
                default: null,
            },
        },
    };
</script>
