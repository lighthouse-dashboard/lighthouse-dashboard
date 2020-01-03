<template>
    <v-container>
        <h1 class="display-2">Overview</h1>

        <v-row>
            <v-col>
                <speed-overview/>
            </v-col>
        </v-row>

        <h1 class="display-1">Favorite Projects</h1>
        <v-row>
            <v-col cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                    v-for="site in sites"
                    :key="site.id">
                <site-overview v-bind="site"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import SiteOverview from '../../components/site-overview/site-overview.vue';
    import SpeedOverview from '../../components/speed-overview/speed-overview.vue';

    export default {
        components: {
            SpeedOverview,
            SiteOverview,
        },
        data() {
            return {
                sites: [],
            };
        },
        computed: {
            ...mapState('login', ['jwt']),
        },
        methods: {
            ...mapActions('login', ['logout']),
            ...mapActions('sites', ['fetchFavoriteSites']),
        },
        async mounted() {
            this.sites = await this.fetchFavoriteSites();
        },
    };
</script>
