<template>
    <div>
        <slot v-bind="{counter}"/>
    </div>
</template>

<script>

    import { mapActions } from 'vuex';

    export default {

        data: () => ({ counter: 0 }),

        methods: {
            ...mapActions('sites', ['fetchScheduledSites']),

            async load() {
                this.counter = (await this.fetchScheduledSites()).length;
            },
        },

        mounted() {
            this.load();
        },
    };
</script>
