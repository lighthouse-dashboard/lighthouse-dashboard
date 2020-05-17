<template>
    <div>
        <latest-audits-feed/>
        <favorite-projects-overview/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import CONFIG from '../../../../../../config/dashboard';
    import FavoriteProjectsOverview from '../../components/favorite-projects-overview/favorite-projects-overview';
    import LatestAuditsFeed from '../../components/latest-audits-feed/latest-audits-feed';
    import withFavoritedSites from '../../containers/with-sites/with-favorited-sites';
    import withLatestSites from '../../containers/with-sites/with-latest-sites';

    export default {
        components: {
            LatestAuditsFeed: withLatestSites(LatestAuditsFeed),
            FavoriteProjectsOverview: withFavoritedSites(FavoriteProjectsOverview),
        },
        computed: {
            charts() {
                return CONFIG.page_dashboard.charts;
            },
            fluid() {
                return CONFIG.page_dashboard.isFluid;
            },
        },

        methods: {
            ...mapActions('sites', ['setSites']),
        },

        beforeDestroy() {
            this.setSites({ sites: [] });
        },
    };
</script>
