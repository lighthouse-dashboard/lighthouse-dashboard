<template>
    <div>
        <h1 class="display-1">Latest reports performance</h1>

        <v-row>
            <v-col cols="12"
                    sm="12"
                    md="6"
                    lg="3"
                    xl="3"
                    v-for="site in sites"
                    :key="site.id">
                <latest-report-gauge v-bind="site" valueId="performance"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import LatestReportGauge from '../latest-report-gauge/latest-report-gauge';

    export default {
        components: { LatestReportGauge },
        props: {},
        data() {
            return {
                sites: [],
            };
        },
        methods: {
            ...mapActions('sites', ['getLatestSites']),
        },
        async mounted() {
            this.sites = await this.getLatestSites();
        },
    };
</script>
