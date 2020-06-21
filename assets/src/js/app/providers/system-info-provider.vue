<script>
    import { mapActions } from 'vuex';

    export default {
        data: () => ({
            info: null,
            isLoading: false,
        }),

        methods: {
            ...mapActions('system', ['fetchInfo']),
        },

        created() {
            this.isLoading = true;
            this.fetchInfo()
                .then((info) => {
                    this.info = info;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        render() {
            return this.$scopedSlots.default({
                info: this.info,
                isLoading: this.isLoading,
            });
        },
    };
</script>
