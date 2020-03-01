<template>
    <div>
        <v-subheader>
            Latest reports performance
        </v-subheader>
        <v-row>
            <v-col :cols="cols"
                    :lg="cols"
                    md="6"
                    sm="12"
                    v-for="site in sites"
                    :key="site.id">
                <latest-report-gauge v-bind="site"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { DASHBOARD } from '../../../../../config/dashboard';
    import LatestReportGauge from '../latest-report-gauge/latest-report-gauge';

    export default {
        components: { LatestReportGauge },
        props: {},
        data() {
            return {
                sites: [],
                interval: null,
            };
        },
        computed: {
            cols() {
                return DASHBOARD.latestAudits.colSize;
            },
        },
        methods: {
            ...mapActions('sites', ['getLatestSites']),
            loadSites() {
                this.getLatestSites()
                    .then((data) => {
                        this.sites = data;
                    });
            },
        },

        beforeDestroy() {
            clearInterval(this.interval);
        },

        mounted() {
            this.loadSites();
            this.interval = setInterval(() => {
                this.loadSites();
            }, DASHBOARD.UPDATE_INTERVAL);
        },
    };
</script>
