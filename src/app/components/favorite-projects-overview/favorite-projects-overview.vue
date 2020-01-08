<template>
    <div>
        <h2 class="display-1">Projects</h2>
        <v-row>
            <v-col cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                    xl="3"
                    xxl="2"
                    v-for="site in favoritedSites"
                    :key="site.id">
                <site-overview v-bind="site"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import SiteOverview from '../../components/site-overview/site-overview.vue';

    export default {
        components: {
            SiteOverview,
        },
        computed: {
            ...mapGetters('sites', ['favoritedSites']),
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
