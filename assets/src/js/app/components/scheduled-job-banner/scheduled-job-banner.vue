<template>
    <notification :facets="['success']"
            v-if="hasScheduledJobs">
        Audits are scheduled for this project
    </notification>
</template>

<script>
    import Notification from '../notification/notification';

    export default {
        components: { Notification },
        props: {
            site: {
                type: Object,
                required: true,
            },
        },

        computed: {
            hasScheduledJobs() {
                return (this.site && this.site.is_scheduled) || this.isAuditScheduled;
            },
        },
    };
</script>
