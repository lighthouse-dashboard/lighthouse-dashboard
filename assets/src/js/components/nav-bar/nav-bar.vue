<template>
    <v-tabs
            right
            background-color="transparent"
            color="text"
            slider-color="secondary">
        <v-tab to="/"
                exact>
            Dashboard
        </v-tab>

        <v-tab to="/projects"
                exact>
            Projects
        </v-tab>
    </v-tabs>
</template>

<script>
    import { DASHBOARD } from '../../../../../config/dashboard';

    export default {
        computed: {
            title() {
                return DASHBOARD.TITLE;
            },
        },
    };
</script>
