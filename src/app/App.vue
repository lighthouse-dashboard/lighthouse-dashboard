<template>
    <v-app id="inspire">
        <v-app-bar
                app
                clipped-left
        >
            <v-toolbar-title>dreipol</v-toolbar-title>
            <v-spacer></v-spacer>
            <create-site-form/>
        </v-app-bar>

        <v-content>
            <v-container>
                <v-row>
                    <v-col>
                        <speed-overview/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12"
                            sm="12"
                            md="6"
                            lg="4"
                            v-for="site in sites"
                            :key="site.id"

                    >
                        <site-overview v-bind="site"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-footer app/>
    </v-app>
</template>

<script>
    import axios from 'axios';
    import chunk from 'lodash.chunk';
    import CreateSiteForm from './components/create-site-form/create-site-form';
    import SiteOverview from './components/site-overview/site-overview.vue';
    import SpeedOverview from './components/speed-overview/speed-overview.vue';
    import { GET_SITES_URL } from './config/routes';

    export default {
        components: {
            CreateSiteForm,
            SpeedOverview,
            SiteOverview,
        },
        data() {
            return {
                sites: [],
            };
        },
        computed: {
            siteChunks() {
                return chunk(this.sites, 3);
            },
        },
        mounted() {
            axios.get(GET_SITES_URL)
                .then(({ data }) => {
                    this.sites = data;
                });
        },
        created() {
            this.$vuetify.theme.dark = true;
        },
    };
</script>
