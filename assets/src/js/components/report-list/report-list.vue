<template>
    <v-card>
        <v-card-title>Audits</v-card-title>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :items-per-page="10"/>
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
                    { text: 'Message', value: 'message' },
                    { text: 'Created At', value: 'createdAt' },
                    { text: 'Has Raw Data', value: 'hasRawData' },
                ].concat(scores);
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
    };
</script>
