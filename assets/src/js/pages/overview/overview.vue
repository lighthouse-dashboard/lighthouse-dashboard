<template>
    <v-container>
        <dashboard-section
                :type="config"
                v-for="config in charts"
                :key="config"
        />
    </v-container>
</template>

<script>
    import { DASHBOARD } from '../../../../../dashboard.config';
    import DashboardSection from '../../components/dashboard-section/dashboard-section';

    export default {
        components: {
            DashboardSection,
        },
        computed: {
            charts() {
                return DASHBOARD.CHARTS;
            },
        },
    };
</script>
