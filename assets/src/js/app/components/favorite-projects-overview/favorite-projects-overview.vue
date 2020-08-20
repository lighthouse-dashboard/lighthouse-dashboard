<template>
    <div class="favorite-project-overview">
        <p class="u-reset overline">
            {{ $t('favorite-projects.overview-title') }}
        </p>

        <loading-indicator v-if="isLoading"/>
        <div class="favorite-project-overview--content"
                v-else>
            <reports-provider v-for="site in sites"
                    :id="site.id"
                    :key="site.id">
                <site-overview
                        slot-scope="{reports}"
                        v-bind="site"
                        :reports="reports"/>
            </reports-provider>
        </div>
    </div>
</template>

<script>
    import ReportsProvider from '../../providers/reports-provider/reports-provider';
    import SitesProvider from '../../providers/sites-provider';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import SiteOverview from '../site-overview/site-overview.vue';

    export default {
        components: {
            ReportsProvider,
            SitesProvider,
            LoadingIndicator,
            SiteOverview,
        },
        props: {
            /**
             * @type {Sites.SiteModel[]}
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
