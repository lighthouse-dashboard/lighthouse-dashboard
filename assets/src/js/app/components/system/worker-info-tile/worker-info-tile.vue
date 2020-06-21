<template>
    <tile title="Worker"
            class="system--section">
        <loading-indicator v-if="isLoading"/>

        <div class="system--row"
                v-if="info">
            <span class="u-reset">Worker last run</span>
            <span class="u-reset">{{ workerLastRunDate }}</span>
        </div>

        <div class="system--row"
                v-if="info">
            <span class="u-reset">Worker is running</span>
            <span class="u-reset"
                    v-if="info">{{ info.worker_is_running }}</span>
        </div>
    </tile>
</template>

<script>
    import { formatDistanceToNow } from 'date-fns';
    import LoadingIndicator from '../../base/loading-indicator/loading-indicator';
    import Tile from '../../tile/tile';

    export default {
        components: { LoadingIndicator, Tile },
        props: {
            isLoading: {
                type: Boolean,
                default: false,
            },

            /** @type {SystemAPI.Info} */
            info: {
                type: Object,
                default: null,
            },
        },

        computed: {
            workerLastRunDate() {
                if (!this.info) {
                    return null;
                }

                return formatDistanceToNow(new Date(this.info.worker_last_run), { addSuffix: true });
            },
        },
    };
</script>
