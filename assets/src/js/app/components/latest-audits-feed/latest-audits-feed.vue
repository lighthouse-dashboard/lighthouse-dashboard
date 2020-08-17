<template>
    <div class="latest-audits-feed">
        <p class="u-reset overline">
            {{ $t('latest-projects.performance-overview-title') }}
        </p>

        <loading-indicator v-if="isLoading"/>
        <div class="latest-audits-feed--content"
                v-else>
            <site-report-tile
                    :site="site"
                    v-for="site in latestSites"
                    :key="site.id"/>
        </div>
    </div>
</template>

<script>
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import SiteReportTile from '../site-report-tile/site-report-tile';

    export default {
        components: {
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
