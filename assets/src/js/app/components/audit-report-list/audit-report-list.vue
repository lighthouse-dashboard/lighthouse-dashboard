<template>
    <list class="audit-report-list">
        <span class="caption"
                v-if="list.length === 0">{{ $t('general.empty-list') }}</span>
        <list-item v-for="report in list"
                :key="report._id">
            <a class="link"
                    target="_blank"
                    :href="`/api/reports/report/${ report._id }`">
                {{ report.createdAt | format-date }}
            </a>
        </list-item>
    </list>
</template>

<script>
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';

    export default {
        components: { ListItem, List },
        props: {
            isLoading: {
                type: Boolean,
                default: false,
            },

            /** @type {Reports.Report[]} */
            reports: {
                type: Array,
                required: true,
            },
            max: {
                type: Number,
                default: 5,
            },
        },

        computed: {
            /**
             * Get reports which contain raw LH data
             * @return {Reports.Report[]}
             */
            list() {
                return this.reports
                    .filter((report) => !!report.raw)
                    .slice(0, this.max);
            },
        },
    };
</script>
