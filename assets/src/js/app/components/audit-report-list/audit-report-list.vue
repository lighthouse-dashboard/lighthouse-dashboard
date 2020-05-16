<template>
    <tile title="Available HTML Reports">
        <ul class="audit-report-list">
            <li v-for="report in reports"
                    :key="report._id">
                <btn :to="`/api/reports/report/${report._id}`"
                        facet="flat"
                        target="_blank">
                    {{ report.createdAt | date }}
                </btn>
            </li>
        </ul>
    </tile>
</template>

<script>
    import Btn from '../base/btn/btn';
    import Tile from '../tile/tile';

    export default {
        components: { Btn, Tile },
        props: {
            /** @type {Report[]} */
            list: {
                type: Array,
                required: true,
            },
        },

        computed: {
            reports() {
                return this.list.filter((report) => report.hasRawData);
            },
        },
    };
</script>
