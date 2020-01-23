<template>
    <v-container :fluid="fluid">
        <v-subheader>Projects</v-subheader>
        <v-row>
            <v-col :cols="cols"
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
    import { DASHBOARD } from '../../../../../dashboard.config';
    import SiteOverview from '../../components/site-overview/site-overview.vue';

    export default {
        components: {
            SiteOverview,
        },

        computed: {
            ...mapState('login', ['jwt']),
            ...mapState('sites', ['sites']),
            cols() {
                return DASHBOARD.PAGE_PROJECTS.colSize;
            },

            fluid() {
                return DASHBOARD.PAGE_PROJECTS.IS_FLUID;
            },
        },

        methods: {
            ...mapActions('sites', ['fetchAllSites']),
        },

        async mounted() {
            await this.fetchAllSites();
        },
    };
</script>
