<template>
    <div class="sites-with-report-table">
        <v-data-table
                :loading="isLoading"
                :headers="headers"
                :items="items"
                :items-per-page="10">
            <template v-slot:item.name="{ item }">
                <router-link :to="`/projects/${item.id}`">
                    {{ item.name }}
                </router-link>
            </template>

            <template v-slot:item.values.performance="{ item }">
                <v-chip :color="getColor(item.values.performance)"
                        dark>
                    {{ item.values.performance }}
                </v-chip>
            </template>

            <template v-slot:item.createdAt="{ item }">
                {{ item.createdAt | date }}
            </template>

            <template v-slot:item.hasRaw="{ item }">
                <v-btn text
                        target="_blank"
                        :href="`/api/reports/report/${item._id}`"
                        v-if="item.hasRaw">
                    <v-icon>mdi-file-chart</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
        props: {
            /** @var {Sites.SiteWithReport} */
            sites: {
                type: Array,
                required: true,
            },

            isLoading: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            headers() {
                if (!this.sites[0]) {
                    return [];
                }

                const valueHeaders = this.sites[0].report.values.map(v => ({ text: v.id, value: `values.${ v.id }` }));
                return [
                    { text: 'Name', value: 'name' },
                    { text: 'Last Report', value: 'createdAt' },
                ]
                    .concat(valueHeaders)
                    .concat([
                        { text: 'Device', value: 'device' },
                        { text: 'URL', value: 'url' },
                        { text: 'Report', value: 'hasRaw' },
                    ]);
            },
            items() {
                return this.sites.map(s => {
                    return {
                        ...s.site,
                        ...s.report,
                        values: s.report.values.reduce((a, v) => {
                            a[v.id] = v.value;
                            return a;
                        }, {}),
                    };
                });
            },
        },

        methods: {
            getColor(score) {
                if (score > 90) {
                    return 'green';
                } else if (score > 70) {
                    return 'orange';
                }
                return 'red';
            },
        },
    };
</script>
