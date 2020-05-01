<template>
    <div v-inview:enter="fetchAllSites">
        <v-subheader>
            Projects
        </v-subheader>
        <v-row>
            <v-col :cols="cols"
                    :lg="cols"
                    md="6"
                    sm="12"
                    v-for="site in favoritedSites"
                    :key="site.id">
                <site-overview v-bind="site"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import CONFIG from '../../../../../config/dashboard';
    import SiteOverview from '../site-overview/site-overview.vue';

    export default {
        components: {
            SiteOverview,
        },
        computed: {
            ...mapGetters('sites', ['favoritedSites']),
            cols() {
                return CONFIG.favoriteProjectsOverview.colSize;
            },
        },
        methods: {
            ...mapActions('login', ['logout']),
            ...mapActions('sites', ['fetchAllSites']),
        },
    };
</script>
