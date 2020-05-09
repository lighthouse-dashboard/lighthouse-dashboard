<template>
    <div>
        <favorite-projects-overview/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import CONFIG from '../../../../../../config/dashboard';
    import DashboardSection from '../../components/dashboard-section/dashboard-section';
    import FavoriteProjectsOverview from '../../components/favorite-projects-overview/favorite-projects-overview';
    import withFavoritedSites from '../../containers/with-sites/with-favorited-sites';

    export default {
        components: {
            FavoriteProjectsOverview: withFavoritedSites(FavoriteProjectsOverview),
            DashboardSection,
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
