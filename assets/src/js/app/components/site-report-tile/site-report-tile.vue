<template>
    <tile class="site-report-tile">
        <scheduled-job-indicator v-if="is_scheduled"/>
        <template
                slot="title">
            <btn facets="flat"
                    class="latest-audits-feed--title-btn"
                    :title="name"
                    :to="`/app/projects/${id}`">
                {{ name }}
            </btn>
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
    import Btn from '../base/btn/btn';
    import ReportDetail from '../report-detail/report-detail';
    import ScheduledJobIndicator from '../scheduled-job-indicator/scheduled-job-indicator';
    import Tile from '../tile/tile';

    export default {
        components: { ScheduledJobIndicator, ReportDetail, Btn, Tile },
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

            /** @type {Reports.Report} */
            report: {
                type: Object,
                default: null,
            },
        },
    };
</script>
