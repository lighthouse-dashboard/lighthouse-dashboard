<template>
    <v-btn @click="onClick">
        Audit all
    </v-btn>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions('sites', ['createReportForAll']),
            onClick() {
                this.createReportForAll();
            },
        },
    };
</script>
