<template>
    <v-card>
        <v-card-title>Audits</v-card-title>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :items-per-page="10">

                <template v-slot:item.performance="{ item }">
                    <v-chip :color="getColor(item.performance)"
                            dark>{{ item.performance }}
                    </v-chip>
                </template>
                <template v-slot:item.hasRawData="{ item }">
                    <v-btn text
                            target="_blank"
                            :href="`/api/reports/report/${item._id}`"
                            v-if="item.hasRawData">
                        <v-icon>mdi-file-chart</v-icon>
                    </v-btn>
                </template>

                <template v-slot:item.createdAt="{ item }">
                    {{ item.createdAt | date }}
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: {
            /** @type {Report[]} */
            list: {
                type: Array,
                required: true,
            },
        },

        computed: {
            headers() {
                /** @type {Report} */
                const firstReport = this.list[0];
                if (!firstReport) {
                    return [];
                }
                const scores = firstReport.values.map(v => ({ text: v.id, value: v.id }));

                return [
                    { text: 'Created At', value: 'createdAt' },
                ]
                    .concat(scores)
                    .concat([
                        { text: 'Message', value: 'message' },
                        { text: 'HTML Report', value: 'hasRawData' },
                    ]);
            },

            items() {
                return this.list.map((report) => {
                    return report.values.reduce((acc, value) => {
                        acc[value.id] = value.value;
                        return acc;
                    }, { ...report });
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
        }
    };
</script>
