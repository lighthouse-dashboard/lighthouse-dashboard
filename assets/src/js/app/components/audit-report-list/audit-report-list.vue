<template>
    <div>
        <v-card-title>Available HTML Reports</v-card-title>
        <v-card-text>
            <v-list class="audit-report-list">
                <v-list-item
                        :to="`/api/reports/report/${report._id}`"
                        target="_blank"
                        v-for="report in reports"
                        :key="report._id">

                    <v-list-item-content>
                        <v-list-item-title>{{ report.createdAt | date }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon>mdi-open-in-new</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-card-text>
    </div>
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
            reports() {
                return this.list.filter((report) => report.hasRawData);
            },
        },
    };
</script>
