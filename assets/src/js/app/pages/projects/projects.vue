<template>
    <div class="projects">
        <p class="overline">All Projects</p>
        <loading-indicator v-if='isLoading'/>
        <div class="projects--list"
                v-else>
            <tile
                    v-for="site in sites"
                    :key="site.site.id">
                <template slot="title">
                    <btn
                            facets="flat"
                            :to="{name: 'project.detail', params: {id: site.site.id}}">
                        {{ site.site.name }}
                    </btn>
                </template>

                <report-detail :report="site.report"/>
            </tile>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Btn from '../../components/base/btn/btn';
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';
    import ReportDetail from '../../components/report-detail/report-detail';
    import Tile from '../../components/tile/tile';
    import formatDate from '../../filters/format-date';

    export default {
        components: {
            LoadingIndicator,
            Tile,
            ReportDetail,
            Btn,
        },

        props: {
            /** @type {Sites.SiteConfig[]} */
            sites: {
                type: Array,
                required: true,
            },
            isLoading: {
                type: Boolean,
                default: false,
            }
        },

        computed: {
            flattenSites() {
                return this.sites.map(({ site, report }) => {
                    return {
                        name: site.name,
                        last_audit: site.last_audit,
                        device: site.device,
                        hasRaw: site.hasRaw,
                        ...report.values.reduce((acc, val) => {
                            acc[val.id] = val.value;
                            return acc;
                        }, []),
                    };
                });
            },
            columns() {
                return [
                    { label: 'Name', field: 'name' },
                    {
                        label: 'Last Audit',
                        field: 'last_audit',
                        representedAs: ({ last_audit }) => formatDate(last_audit),
                    },

                    { label: 'Device', field: 'device' },
                    { label: 'Performance', field: 'performance' },
                    { label: 'SEO', field: 'seo' },
                    { label: 'Accessibility', field: 'accessibility' },
                    { label: 'Best Practices', field: 'best-practices' },
                    { label: 'PWA', field: 'pwa' },
                    { label: 'PWA', field: 'pwa' },

                    {
                        label: 'HTML Report',
                        field: 'hasRaw',
                        representedAs: ({ hasRaw }) => hasRaw ? `TRUE` : `FALSE`,
                    },
                ];
            },
        },

        methods: {
            ...mapActions('sites', ['setSites', 'fetchAllSites']),
        },

        mounted() {
        },
    };
</script>
