<template>
    <div>
        <dashboard-section
                :type="config"
                v-for="config in charts"
                :key="config"/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import CONFIG from '../../../../../config/dashboard';
    import DashboardSection from '../../components/dashboard-section/dashboard-section';

    export default {
        components: {
            DashboardSection,
        },
        computed: {
            charts() {
                return CONFIG.page_dashboard.charts;
            },
            fluid() {
                return CONFIG.page_dashboard.isFluid;
            },
        },

        methods: {
            ...mapActions('sites', ['setSites']),
        },

        beforeDestroy() {
            this.setSites({ sites: [] });
        },
    };
</script>
