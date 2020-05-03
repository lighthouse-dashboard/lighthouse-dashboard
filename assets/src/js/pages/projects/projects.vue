<template>
    <div>
        <v-app-bar color="transparent"
                flat>
            <template v-slot:extension>
                <create-site-form/>
            </template>
        </v-app-bar>

        <v-container>
            <v-row cols="12">
                <v-col cols="3"
                        offset="4">
                    <site-search-input/>
                </v-col>
            </v-row>
        </v-container>

        <v-container :fluid="fluid">
            <v-row>
                <v-col :cols="cols"
                        v-for="site in sites"
                        :key="site.id">
                    <site-overview v-bind="site"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import config from '../../../../../config/dashboard';
    import CreateSiteForm from '../../components/create-site-form/create-site-form';
    import SiteOverview from '../../components/site-overview/site-overview.vue';
    import SiteSearchInput from '../../components/site-search-input/site-search-input';

    export default {
        components: {
            SiteSearchInput,
            CreateSiteForm,
            SiteOverview,
        },

        computed: {
            ...mapState('login', ['jwt']),
            ...mapState('sites', ['sites']),
            cols() {
                return config.page_projects.colSize;
            },

            fluid() {
                return config.page_projects.isFluid;
            },
        },

        methods: {
            ...mapActions('sites', ['setSites', 'getLatestSites']),
        },

        beforeDestroy() {
            this.setSites({ sites: [] });
        },

        mounted() {
            this.getLatestSites();
        },
    };
</script>
