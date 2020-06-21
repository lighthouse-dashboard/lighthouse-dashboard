<script>
    import { mapActions } from 'vuex';

    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
        },

        data: () => ({
            reports: [],
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
        },

        created() {
            this.loadData();
        },

        render() {
            return this.$scopedSlots.default({
                reports: this.reports,
                isLoading: this.isLoading,
            });
        },
    };
</script>
