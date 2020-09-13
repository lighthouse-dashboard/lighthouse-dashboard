<template>
    <tile :title="$t('system.worker-tile-title')"
            :facets="['no-padding']"
            icon="rocket"
            class="system--section">
        <ul class="list">
            <li class="list-item">
                <p class="u-reset caption">
                    {{ $t('general.last-run') }}
                </p>
                <p class="u-reset subtitle1">{{ workerLastRunDate }}</p>
            </li>
            <li class="list-item">
                <p class="u-reset caption">
                    {{ $t('system.worker-is-running') }}
                </p>
                <p class="u-reset subtitle1">{{ info.is_running }}</p>
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
