<template>
    <loading-indicator v-if="isLoading"/>
    <div v-else-if="sites">
        <slot :sites="sites"/>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import LoadingIndicator from '../components/base/loading-indicator/loading-indicator';

    export default {
        components: { LoadingIndicator },
        data: () => ({
            isLoading: false,
        }),

        computed: {
            ...mapState('sites', ['sites']),
        },

        methods: {
            ...mapActions('sites', ['fetchAllSites']),
        },

        mounted() {
            this.isLoading = true;
            this.fetchAllSites()
                .finally(() => {
                    this.isLoading = false;
                });
        },
    };
</script>
