<template>
    <v-container>
        <h1 class="display-1">Projects</h1>
        <v-row>
            <v-col cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                    xl="3"
                    v-for="site in sites"
                    :key="site.id"
            >
                <site-overview v-bind="site"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import SiteOverview from '../../components/site-overview/site-overview.vue';

    export default {
        components: {
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
            ...mapActions('sites', ['fetchAllSites']),
        },
        async mounted() {
            this.sites = await this.fetchAllSites();
        },
    };
</script>
