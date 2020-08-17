<template>
    <tile class="site-report-tile">
        <scheduled-job-indicator v-if="site && site.is_scheduled"/>
        <template
                slot="title">
            <btn facets="flat"
                    class="latest-audits-feed--title-btn"
                    :title="site.name"
                    :to="`/app/projects/${site.id}`">
                {{ site.name }}
            </btn>
        </template>
        <span
                :title="$t('general-created-at')"
                class="u-reset caption latest-audits-feed--caption"
                slot="caption">
            {{ site.last_audit | format-date }}
        </span>
        <report-detail :site-id="site.id"/>
    </tile>
</template>

<script>
    import withLatestReport from '../../containers/with-latest-report';
    import Btn from '../base/btn/btn';
    import ReportDetail from '../report-detail/report-detail';
    import ScheduledJobIndicator from '../scheduled-job-indicator/scheduled-job-indicator';
    import Tile from '../tile/tile';

    export default {
        components: { ScheduledJobIndicator, ReportDetail: withLatestReport(ReportDetail), Btn, Tile },
        props: {
            /** @type {Sites.SiteModel} */
            site: {
                type: Object,
                required: true,
            },
        },
    };
</script>
