<template>
    <v-app-bar
            app
            flat
            dense
            elevate-on-scroll
            hide-on-scroll
            color="primary">
        <v-spacer/>

        <template v-slot:extension>
            <v-container fluid>
                <v-tabs align-with-title
                        background-color="transparent"
                        color="text"
                        slider-color="secondary"
                >
                    <v-tab to="/">Dashboard</v-tab>
                    <v-tab to="/projects">Projects</v-tab>
                </v-tabs>
                <create-site-form/>
            </v-container>
        </template>
    </v-app-bar>
</template>

<script>
    import CreateSiteForm from '../create-site-form/create-site-form';

    export default {
        components: {
            CreateSiteForm,
        },
        computed: {},
    };
</script>
