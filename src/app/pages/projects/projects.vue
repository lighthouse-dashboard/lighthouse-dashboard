<template>
    <v-container>
        <h1 class="display-1">Projects</h1>
        <v-row>
            <v-col cols="12"
                    sm="12"
                    md="6"
                    lg="3"
                    v-for="site in sites"
                    :key="site.id"
            >
                <site-overview v-bind="site"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import SiteOverview from '../../components/site-overview/site-overview.vue';
    import { GET_SITES_URL } from '../../config/routes';
    import axios from '../../utils/axios';

    export default {
        components: {
            SiteOverview,
        },
        data() {
            return {
                sites: [],
            };
        },
        mounted() {
            axios.get(GET_SITES_URL)
                .then(({ data }) => {
                    this.sites = data;
                });
        },
    };
</script>
