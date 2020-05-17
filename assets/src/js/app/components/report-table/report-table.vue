<template>
    <tile title="Audits"
            class="report-table">
        <list>
            <list-item v-for="item in reportsWithHtml"
                    :key="item._id">
                <btn target="_blank"
                        :facets="['flat', 'full-width']"
                        :href="`/api/reports/report/${item._id}`">
                    {{ item.createdAt|date }}
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
        components: { Btn, ListItem, List, Tile },
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
