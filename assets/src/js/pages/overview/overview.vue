<template>
    <v-container :fluid="fluid">
        <dashboard-section
                :type="config"
                v-for="config in charts"
                :key="config"/>
    </v-container>
</template>

<script>
    import { DASHBOARD } from '../../../../../config/dashboard';
    import DashboardSection from '../../components/dashboard-section/dashboard-section';

    export default {
        components: {
            DashboardSection,
        },
        computed: {
            charts() {
                return DASHBOARD.PAGE_DASHBOARD.CHARTS;
            },
            fluid() {
                return DASHBOARD.PAGE_DASHBOARD.IS_FLUID;
            },
        },
    };
</script>
