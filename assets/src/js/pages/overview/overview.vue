<template>
    <div>
        <v-container>
            <sites-with-report-table :is-loading="isLoading"
                    :sites="sites"/>
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
                isLoading: true,
            };
        },

        methods: {
            ...mapActions('sites', ['getSitesWithLatestReport']),

            loadData() {
                this.getSitesWithLatestReport()
                    .then((sites) => {
                        this.sites = sites;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        mounted() {
            this.loadData();
        },
    };
</script>
