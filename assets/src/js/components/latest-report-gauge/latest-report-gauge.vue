<template>
    <v-card  v-inview:enter="loadData">
        <v-card-title>
            <site-title :is_favorite="is_favorite">
                <v-btn text color="text" :to="`/project/${id}`">{{ name }}</v-btn>
            </site-title>
        </v-card-title>
        <v-card-text>
            <gauge-chart :labels="labels"
                    :series="series"/>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex';
    import GaugeChart from '../charts/gauge-chart/gauge-chart';
    import SiteTitle from '../site-title/site-title';

    export default {
        components: { GaugeChart, SiteTitle },
        props: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            is_favorite: {
                type: Boolean,
                required: true,
            },
        },

        data() {
            return {
                data: null,
                chart: null,
                chartData: null,
                isLoading: false,
                interval: null,
                labels: [],
                series: [],
            };
        },
        methods: {
            ...mapActions('reports', ['fetchLatestReportForSite']),

            loadData() {
                this.isLoading = true;
                this.fetchLatestReportForSite({ siteId: this.id })
                    .then(({ labels, series }) => {
                        this.labels = labels;
                        this.series = series;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
    };
</script>
