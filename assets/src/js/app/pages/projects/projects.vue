<template>
    <div class="projects">
        <p class="u-reset overline">
            All Projects
        </p>

        <loading-indicator v-if='isLoading'/>
        <div class="projects--list"
                v-else>
            <tile
                    v-for="site in sites"
                    :key="site.site.id">
                <template slot="title">
                    <btn
                            class="projects--title-btn"
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
    import Btn from '../../components/base/btn/btn';
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';
    import ReportDetail from '../../components/report-detail/report-detail';
    import Tile from '../../components/tile/tile';

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
            },
        },
    };
</script>
