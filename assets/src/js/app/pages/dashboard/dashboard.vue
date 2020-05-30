<template>
    <div class='dashboard'>
        <latest-audits-feed class='dashboard--section'/>
        <favorite-projects-overview class='dashboard--section'/>
    </div>
</template>

<script>
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
        },
    };
</script>
