<template>
    <div>
        <v-app-bar color="transparent"
                flat>
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <template v-slot:extension>
                <create-site-form/>
            </template>
        </v-app-bar>

        <v-container :fluid="fluid">
            <dashboard-section
                    :type="config"
                    v-for="config in charts"
                    :key="config"/>
        </v-container>
    </div>
</template>

<script>
    import { DASHBOARD } from '../../../../../config/dashboard';
    import CreateSiteForm from '../../components/create-site-form/create-site-form';
    import DashboardSection from '../../components/dashboard-section/dashboard-section';

    export default {
        components: {
            CreateSiteForm,
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
