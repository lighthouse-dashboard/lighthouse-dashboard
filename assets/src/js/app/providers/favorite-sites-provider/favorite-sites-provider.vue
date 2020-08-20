<template>
    <loading-indicator v-if="isLoading"/>
    <div v-else-if="favoritedSites">
        <slot :sites="favoritedSites"/>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';

    export default {
        components: { LoadingIndicator },

        data: () => ({
            isLoading: false,
        }),

        computed: {
            ...mapGetters('sites', ['favoritedSites']),
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
    };
</script>
