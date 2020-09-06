<template>
    <ul class="audit-report-list list">
        <li class="caption list-item"
                v-if="list.length === 0">{{ $t('general.empty-list') }}
        </li>
        <li class="list-item"
                v-for="report in list"
                :key="report._id">
            <a class="link"
                    target="_blank"
                    :href="`/api/reports/report/${ report.raw_report.id }`">
                {{ report.createdAt | format-date }}
            </a>
        </li>
    </ul>
</template>

<script>

    export default {
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
                    .filter((report) => !!report.raw_report)
                    .slice(0, this.max);
            },
        },
    };
</script>
