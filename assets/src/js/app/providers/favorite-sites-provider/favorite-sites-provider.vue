<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters('sites', ['favoritedSites']),
        },

        methods: {
            ...mapActions('sites', ['fetchAllSites']),
        },

        created() {
            this.fetchAllSites();
        },

        render() {
            return this.$scopedSlots.default({
                sites: this.favoritedSites,
            });
        },
    };
</script>
