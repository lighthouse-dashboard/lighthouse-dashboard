<template>
    <tile title="Available HTML Reports">
        <list class="audit-report-list">
            <list-item v-for="report in reports"
                    :key="report._id">
                <btn :to="`/api/reports/report/${report._id}`"
                        facet="flat"
                        target="_blank">
                    {{ report.createdAt | date }}
                </btn>
            </list-item>
        </list>
    </tile>
</template>

<script>
    import Btn from '../base/btn/btn';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';
    import Tile from '../tile/tile';

    export default {
        components: { ListItem, List, Btn, Tile },
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
