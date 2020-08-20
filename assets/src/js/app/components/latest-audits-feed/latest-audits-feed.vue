<template>
    <div class="latest-audits-feed">
        <p class="u-reset overline">
            {{ $t('latest-projects.performance-overview-title') }}
        </p>

        <loading-indicator v-if="isLoading"/>
        <div class="latest-audits-feed--content"
                v-else>
            <latest-report-provider v-for="site in latestSites"
                    :id="site.id"
                    :key="site.id">
                <site-report-tile
                        slot-scope="{report}"
                        :report="report"
                        :site="site"/>
            </latest-report-provider>
        </div>
    </div>
</template>

<script>
    import LatestReportProvider from '../../providers/latest-report-provider';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import SiteReportTile from '../site-report-tile/site-report-tile';

    export default {
        components: {
            LatestReportProvider,
            SiteReportTile,
            LoadingIndicator,
        },

        props: {
            /**
             * @type {Sites.SiteModel[]}
             */
            sites: {
                type: Array,
                default: () => [],
            },

            isLoading: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            latestSites() {
                return this.sites.slice(0, 4);
            },
        },
    };
</script>
