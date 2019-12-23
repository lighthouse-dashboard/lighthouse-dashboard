<template>
    <v-app id="inspire">
        <v-app-bar
                app
                clipped-left
        >
            <v-toolbar-title>
                Project Dashboard
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/"
                    text
                    icon
                    color="green darken-1">
                <v-icon>mdi-desktop-mac-dashboard</v-icon>
            </v-btn>
            <v-btn to="/projects"
                    text
                    icon
                    color="green darken-1">
                <v-icon>mdi-view-list</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
            <create-site-form/>
        </v-content>
        <v-footer app/>
    </v-app>
</template>

<script>

    import CreateSiteForm from './components/create-site-form/create-site-form';

    export default {
        components: {
            CreateSiteForm,

        },

        created() {
            this.$vuetify.theme.dark = true;
        },
    };
</script>
