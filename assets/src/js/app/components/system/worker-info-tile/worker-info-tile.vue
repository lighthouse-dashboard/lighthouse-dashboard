<template>
    <tile :title="$t('system.worker-tile-title')"
            class="system--section">
        <div class="system--row">
            <span class="u-reset">
                {{ $t('general.last-run') }}
            </span>
            <span class="u-reset">{{ workerLastRunDate }}</span>
        </div>

        <div class="system--row">
            <span class="u-reset">
                {{ $t('system.worker-is-running') }}
            </span>
            <span class="u-reset"
                    v-if="info">{{ info.is_running }}</span>
        </div>
    </tile>
</template>

<script>
    import { formatDistanceToNow } from 'date-fns';
    import Tile from '../../tile/tile';

    export default {
        components: {   Tile },
        props: {
            /**
             * @type {AuditWorkerInfoModel}
             */
            info: {
                type: Object,
                required: true,
            },
        },

        computed: {
            workerLastRunDate() {
                if (!this.info) {
                    return null;
                }

                return formatDistanceToNow(new Date(this.info.last_run), { addSuffix: true });
            },
        },
    };
</script>
