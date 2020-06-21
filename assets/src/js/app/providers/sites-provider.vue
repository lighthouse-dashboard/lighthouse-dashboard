<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        data: () => ({
            isLoading: false,
        }),

        computed: {
            ...mapState('sites', ['sites']),
        },

        methods: {
            ...mapActions('sites', ['fetchAllSites']),
        },

        created() {
            this.isLoading = true;
            this.fetchAllSites()
                .finally(() => {
                    this.isLoading = false;
                });
        },

        render() {
            return this.$scopedSlots.default({
                sites: this.sites,
                isLoading: this.isLoading
            });
        },
    };
</script>
