<template>
    <tile :title="$t('system.worker-tile-title')"
            icon="rocket"
            class="system--section">
        <ul class="list">
            <li class="list-item">
                <p class="u-reset subtitle1">
                    {{ $t('general.last-run') }}
                </p>
                <p class="u-reset caption">{{ workerLastRunDate }}</p>
            </li>
            <li class="list-item">
                <p class="u-reset subtitle1">
                    {{ $t('system.worker-is-running') }}
                </p>
                <p class="u-reset caption">{{ info.is_running }}</p>
            </li>
        </ul>
    </tile>
</template>

<script>
    import { formatDistanceToNow } from 'date-fns';
    import Tile from '../../tile/tile';

    export default {
        components: { Tile },
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
