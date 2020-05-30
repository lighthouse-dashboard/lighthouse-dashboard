<template>
    <div class="latest-audits-feed">
        <p class="u-reset overline">
            Latest reports performance
        </p>

        <loading-indicator v-if='isLoading'/>
        <div class="latest-audits-feed--content"
                v-else>
            <tile
                    v-for="site in sites"
                    :key="site.id">
                <template
                        slot="title">
                    <btn facets="flat"
                            class="latest-audits-feed--title-btn"
                            :title="site.name"
                            :to="{name: 'project.detail', params: {id: site.id}}">
                        {{ site.name }}
                    </btn>
                </template>
                <span
                        class="u-reset caption latest-audits-feed--caption"
                        slot="caption">
                    {{ site.last_audit | format-date }}
                </span>
                <report-detail :site-id="site.id"/>
            </tile>
        </div>
    </div>
</template>

<script>
    import CONFIG from '../../../../../../config/dashboard';
    import withLatestReport from '../../containers/with-latest-report';
    import Btn from '../base/btn/btn';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import ReportDetail from '../report-detail/report-detail';
    import Tile from '../tile/tile';

    export default {
        components: {
            LoadingIndicator,
            Btn,
            Tile,
            ReportDetail: withLatestReport(ReportDetail),
        },

        props: {
            sites: {
                type: Array,
                required: true,
            },
            isLoading: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            cols() {
                return CONFIG.latestAuditChart.colSize;
            },
        },
    };
</script>
