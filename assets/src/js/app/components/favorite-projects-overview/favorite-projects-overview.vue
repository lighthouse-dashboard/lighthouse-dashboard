<template>
    <div class='favorite-project-overview'>
        <p class='u-reset overline'>
            Projects
        </p>

        <loading-indicator v-if='isLoading'/>
        <div class='favorite-project-overview--content'
                v-else>
            <site-overview
                    v-bind="site"
                    v-for="site in sites"
                    :key="site.id"/>
        </div>
    </div>
</template>

<script>
    import withReports from '../../containers/with-reports';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import SiteOverview from '../site-overview/site-overview.vue';

    export default {
        components: {
            LoadingIndicator,
            SiteOverview: withReports(SiteOverview),
        },
        props: {
            /**
             * @type {Sites.SiteConfig[]}
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
