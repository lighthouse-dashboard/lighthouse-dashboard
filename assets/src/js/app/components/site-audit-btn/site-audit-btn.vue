<template>
    <v-btn @click="runAudit">
        Schedule new audit
    </v-btn>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
        },

        methods: {
            ...mapActions('reports', ['fetchReportsForSite', 'launchAuditForSite']),
            runAudit() {
                return this.launchAuditForSite({ id: this.id });
            },
        },
    };
</script>
