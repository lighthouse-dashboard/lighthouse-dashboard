<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
            initialState: {
                type: Object,
                default: null,
            },
        },

        data: () => ({
            isLoading: false,
        }),

        computed: {
            ...mapState('sites', ['currentSiteConfig']),
        },

        methods: {
            ...mapActions('sites', ['getCurrentSite', 'setCurrentSite']),
        },

        created() {
            if (this.initialState) {
                this.setCurrentSite({ site: this.initialState });
                return;
            }

            this.isLoading = true;
            this.getCurrentSite({ siteId: this.id })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        render() {
            return this.$scopedSlots.default({
                site: this.currentSiteConfig,
                isLoading: this.isLoading,
            });
        },
    };
</script>
