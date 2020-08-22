<template>
    <chart-placeholder v-if="!isInViewport || isLoading"/>
    <div v-else-if="reports">
        <slot :reports="reports"/>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import ChartPlaceholder from '../../components/chart-placeholder/chart-placeholder';
    import inViewMixin from '../../mixins/in-view-mixin';

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
            reports: null,
            isLoading: false,
        }),

        methods: {
            ...mapActions('reports', ['fetchReportsForSite']),
            loadData() {
                this.isLoading = true;
                return this.fetchReportsForSite({ id: this.id })
                    .then((reports) => {
                        this.reports = reports;
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
