<template>
    <v-list-item-content class="report-list-item">
        <v-list-item-title>
            {{ reportItem.createdAt }}
        </v-list-item-title>

        <v-list-item-subtitle>
            <div>
                {{ value.id }} {{ value.value }}
            </div>
        </v-list-item-subtitle>
    </v-list-item-content>
</template>

<script>
    export default {
        props: {
            /** @type {Report} */
            reportItem: {
                type: Object,
                required: true,
            },
        },

        computed: {
            /** @type {ReportValue} */
            values() {
                return this.reportItem.values;
            },
        },
    };
</script>
