<template>
    <chart-placeholder v-if="!isInViewport || isLoading"/>
    <div v-else>
        <slot :report="report"/>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import ChartPlaceholder from '../components/chart-placeholder/chart-placeholder';
    import inViewMixin from '../mixins/in-view-mixin';

    export default {
        components: { ChartPlaceholder },
        mixins: [inViewMixin(true)],
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

            onIntersect() {
                this.loadData();
            },
        },
    };
</script>
