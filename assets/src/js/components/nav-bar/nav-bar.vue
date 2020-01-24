<template>
    <v-tabs
            right
            background-color="transparent"
            color="text"
            slider-color="secondary"
    >
        <v-tab to="/">Dashboard</v-tab>
        <v-tab to="/projects">Projects</v-tab>
    </v-tabs>
</template>

<script>
    import { DASHBOARD } from '../../../../../dashboard.config';

    export default {
        computed: {
            title() {
                return DASHBOARD.TITLE;
            },
        },
    };
</script>
