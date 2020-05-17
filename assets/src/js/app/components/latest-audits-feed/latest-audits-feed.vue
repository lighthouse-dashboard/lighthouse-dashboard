<template>
    <div class="latest-audits-feed">
        <p class="overline">
            Latest reports performance
        </p>

        <div class="latest-audits-feed--content">
            <tile
                    v-for="site in sites"
                    :key="site.id">
                <btn facet="flat"
                        :to="{name: 'project.detail', params: {id: site.id}}"
                        slot="title">
                    {{ site.name }}
                </btn>
                <report-detail :site-id="site.id"/>
                {{ site.last_audit | date }}
            </tile>
        </div>
    </div>
</template>

<script>
    import CONFIG from '../../../../../../config/dashboard';
    import withLatestReport from '../../containers/with-latest-report';
    import Btn from '../base/btn/btn';
    import ReportDetail from '../report-detail/report-detail';
    import Tile from '../tile/tile';

    export default {
        components: {
            Btn,
            Tile,
            ReportDetail: withLatestReport(ReportDetail),
        },

        props: {
            sites: {
                type: Array,
                required: true,
            },
        },

        computed: {
            cols() {
                return CONFIG.latestAuditChart.colSize;
            },
        },
    };
</script>
