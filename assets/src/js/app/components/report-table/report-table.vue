<template>
    <div
            class="report-table">
        <loading-indicator v-if='isLoading'/>
        <list v-else>
            <list-item v-for="item in reportsWithHtml"
                    :key="item._id">
                <btn target="_blank"
                        :facets="['flat', 'full-width']"
                        :href="`/api/reports/report/${item._id}`">
                    {{ item.createdAt | format-date }}
                </btn>
            </list-item>
        </list>
    </div>
</template>

<script>
    import Btn from '../base/btn/btn';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import Tile from '../tile/tile';

    export default {
        components: { LoadingIndicator, Btn, ListItem, List, Tile },
        props: {
            /** @type {Report[]} */
            reports: {
                type: Array,
                required: true,
            },
            isLoading: {
                type: Boolean,
                default: false,
            }
        },

        data() {
            return {
                /** @type {Report} */
                selectedReport: null,
            };
        },

        computed: {
            reportsWithHtml() {
                return this.reports.filter((report) => report.hasRawData);
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
