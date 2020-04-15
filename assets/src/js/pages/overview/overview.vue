<template>
    <div>
        <v-app-bar color="transparent"
                flat>
            <v-toolbar-title>Overview</v-toolbar-title>
        </v-app-bar>

        <v-container>
            <sites-with-report-table :sites="sites"/>

        </v-container>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import SitesWithReportTable from '../../components/sites-with-report-table/sites-with-report-table';

    export default {
        components: { SitesWithReportTable },
        props: {},

        data() {
            return {
                sites: [],
            };
        },

        methods: {
            ...mapActions('sites', ['getSitesWithLatestReport']),

            async loadData() {
                this.sites = await this.getSitesWithLatestReport();
            },
        },
        mounted() {
            this.loadData();
        }
    };
</script>
