<template>
    <loading-indicator v-if="isLoading"/>
    <div v-else-if="report">
        <slot :report="report"/>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import LoadingIndicator from '../components/base/loading-indicator/loading-indicator';

    export default {
        components: { LoadingIndicator },
        props: {
            id: {
                type: String,
                required: true,
            },
        },

        data: () => ({
            report: null,
            isLoading: false,
        }),

        methods: {
            ...mapActions('reports', ['fetchLatestReportForSite']),
            loadData() {
                this.isLoading = true;
                return this.fetchLatestReportForSite({ siteId: this.id })
                    .then((report) => {
                        this.report = report;
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
