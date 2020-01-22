<template>
    <div>
        <v-subheader>
            Projects
        </v-subheader>
        <v-row>
            <v-col :cols="cols"
                    v-for="site in favoritedSites"
                    :key="site.id">
                <site-overview v-bind="site"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { DASHBOARD } from '../../../../../dashboard.config';
    import SiteOverview from '../site-overview/site-overview.vue';

    export default {
        components: {
            SiteOverview,
        },
        computed: {
            ...mapGetters('sites', ['favoritedSites']),
            cols() {
                return DASHBOARD.favoriteProjectsOverview.colSize;
            },
        },
        methods: {
            ...mapActions('login', ['logout']),
            ...mapActions('sites', ['fetchAllSites']),
        },
        async mounted() {
            await this.fetchAllSites();
        },
    };
</script>
