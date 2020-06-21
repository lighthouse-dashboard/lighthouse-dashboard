<script>
    import { fetchHealth } from '../api/health-api';

    export default {
        data: () => ({
            health: null,
            isLoading: false,
        }),

        created() {
            this.isLoading = true;
            return fetchHealth()
                .then((health) => {
                    this.health = health;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        render() {
            return this.$scopedSlots.default({
                health: this.health,
                isLoading: this.isLoading,
            });
        },
    };
</script>
