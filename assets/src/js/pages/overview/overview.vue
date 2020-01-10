<template>
    <v-container>
        <latest-audits-feed/>
        <div>
            <h2 class="display-2 mt-12 mb-6">Favorited projects</h2>
            <speed-overview/>
            <favorite-projects-overview/>
        </div>
    </v-container>
</template>

<script>
    import FavoriteProjectsOverview from '../../components/favorite-projects-overview/favorite-projects-overview';
    import LatestAuditsFeed from '../../components/latest-audits-feed/latest-audits-feed';
    import SpeedOverview from '../../components/speed-overview/speed-overview.vue';

    export default {
        components: {
            FavoriteProjectsOverview,
            LatestAuditsFeed,
            SpeedOverview,
        },
    };
</script>
