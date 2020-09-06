<template>
    <tile class="site-report-tile"
            :icon="icon">
        <template
                slot="title">

            <a class="latest-audits-feed--title-btn link"
                    :title="name"
                    :href="`/app/projects/${id}`">
                {{ name }}
            </a>
        </template>
        <span
                :title="$t('general-created-at')"
                class="u-reset caption latest-audits-feed--caption"
                slot="caption">
            {{ last_audit | format-date }}
        </span>
        <report-detail :report="report"/>
    </tile>
</template>

<script>
    import ReportDetail from '../report-detail/report-detail';
    import Tile from '../tile/tile';

    export default {
        components: { ReportDetail, Tile },
        props: {
            is_scheduled: {
                type: Boolean,
                default: false,
            },
            is_favorite: {
                type: Boolean,
                default: false,
            },
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
            last_audit: {
                type: String,
                default: null,
            },
            is_disabled: {
                type: Boolean,
                default: false,
            },

            /** @type {Reports.Report} */
            report: {
                type: Object,
                default: null,
            },
        },
        computed: {
            icon() {
                switch (true) {
                    case this.is_disabled:
                        return 'ban';
                    case this.is_scheduled:
                        return 'search';
                    case this.is_favorite:
                        return 'heart';
                    default:
                        return null;
                }
            },
        }
    };
</script>
