<template>
    <list class="audit-report-list">
        <span class='caption'
                v-if='list.length === 0'>No Items</span>
        <list-item v-for="report in list"
                :key="report._id">
            <btn :href="`/api/reports/report/${ report._id }`"
                    facets="flat"
                    target="_blank">
                {{ report.createdAt | format-date }}
            </btn>
        </list-item>
    </list>
</template>

<script>
    import Btn from '../base/btn/btn';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';

    export default {
        components: { ListItem, List, Btn },
        props: {
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
                    .filter((report) => report.hasRawData)
                    .slice(0, this.max);
            },
        },
    };
</script>
