<template>
    <div class="projects">
        <p class="u-reset overline">
            All Projects
        </p>

        <loading-indicator v-if='isLoading'/>
        <div class="projects--list"
                v-else>
            <site-report-tile :site="site"
                    v-for="site in sites"
                    :key="site.id"/>
        </div>
    </div>
</template>

<script>
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';
    import SiteReportTile from '../../components/site-report-tile/site-report-tile';

    export default {
        components: {
            SiteReportTile,
            LoadingIndicator,
        },

        props: {
            /** @type {Sites.SiteConfig[]} */
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
