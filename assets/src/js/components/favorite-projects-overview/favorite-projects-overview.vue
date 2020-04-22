<template>
    <div>
        <v-subheader>
            Projects
        </v-subheader>
        <v-row>
            <v-col :cols="cols"
                    :lg="cols"
                    md="6"
                    sm="12"
                    v-for="site in sites"
                    :key="site.id">
                <site-overview v-bind="site"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { DASHBOARD } from '../../../../../config/dashboard';
    import SiteOverview from '../site-overview/site-overview.vue';

    export default {
        components: {
            SiteOverview,
        },
        computed: {
            ...mapGetters('sites', ['sites']),
            cols() {
                return DASHBOARD.favoriteProjectsOverview.colSize;
            },
        },
        methods: {
            ...mapActions('login', ['logout']),
            ...mapActions('sites', ['fetchAllSites']),
        },

        mounted() {
            this.fetchAllSites();
        },
    };
</script>
