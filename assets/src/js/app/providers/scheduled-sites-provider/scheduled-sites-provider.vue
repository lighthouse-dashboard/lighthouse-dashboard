<script>
    import { mapActions } from 'vuex';

    export default {
        data: () => ({
            sites: [],
            isLoading: false,
        }),

        methods: {
            ...mapActions('sites', ['fetchScheduledSites']),
            load() {
                this.isLoading = true;
                this.fetchScheduledSites()
                    .then((sites) => {
                        this.sites = sites;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        created() {
            this.load();
        },

        render() {
            return this.$scopedSlots.default({
                isLoading: this.isLoading,
                sites: this.sites,
            });
        },
    };
</script>
