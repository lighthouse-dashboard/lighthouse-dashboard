<template>
    <tile title="Audits"
            class="report-table">
        <div class="report-table--content">
            <list>
                <list-item v-for="item in reportsWithHtml"
                        :key="item._id">
                    <btn facet="flat"
                            target="_blank"
                            :href="`/api/reports/report/${item._id}`">
                        {{ item.createdAt|date }}
                    </btn>
                </list-item>
            </list>
            <div v-if="selectedReport">
                <report-detail :report="selectedReport"/>
            </div>
        </div>
    </tile>
</template>

<script>
    import Btn from '../base/btn/btn';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';
    import ReportDetail from '../report-detail/report-detail';
    import Tile from '../tile/tile';

    export default {
        components: { ReportDetail, Btn, ListItem, List, Tile },
        props: {
            /** @type {Report[]} */
            list: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                /** @type {Report} */
                selectedReport: null,
            };
        },

        computed: {
            reportsWithHtml() {
                return this.list.filter((report) => report.hasRawData);
            },
        },
        methods: {
            /**
             *
             * @param {Report} item
             */
            onItemClicked(item) {
                this.selectedReport = item;
            },

            getColor(score) {
                if (score > 90) {
                    return 'green';
                } else if (score > 70) {
                    return 'orange';
                }
                return 'red';
            },
        }
    };
</script>
