<template>
    <div class="latest-audits-feed">
        <p class="u-reset overline">
            Latest reports performance
        </p>

        <loading-indicator v-if='isLoading'/>
        <div class="latest-audits-feed--content"
                v-else>
            <site-report-tile
                    :site="site"
                    v-for="site in sites"
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
             * @type {Sites.SiteConfig}
             */
            sites: {
                type: Array,
                required: true,
            },

            isLoading: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>
