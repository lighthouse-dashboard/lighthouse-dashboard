<template>
    <div class="system">
        <div/>
        <loading-indicator v-if="isLoading"/>
        <div class="system--content"
                v-else>

            <tile title="System"
                    class="system--section">
                <div class="system--row">
                    <span class="u-reset">Worker last run</span>
                    <span class="u-reset">{{ formattedDate }}</span>
                </div>

                <div class="system--row">
                    <span class="u-reset">Uptime</span>
                    <span class="u-reset">{{ formattedUptime }}</span>
                </div>
            </tile>

            <tile title="Database"
                    class="system--section">
                <div class="system--row">
                    <span class="u-reset">DB Collections</span>
                    <span class="u-reset">{{ info.db.collections }}</span>
                </div>

                <div class="system--row">
                    <span class="u-reset">DB Data Size</span>
                    <span class="u-reset">{{ info.db.dataSize }}</span>
                </div>


                <div class="system--row">
                    <span class="u-reset">DB Connection</span>
                    <span class="u-reset">{{ health.db_connection }}</span>
                </div>
            </tile>
        </div>
        <div/>
    </div>
</template>

<script>
    import { formatDistanceToNow, subSeconds } from 'date-fns';
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';
    import Tile from '../../components/tile/tile';
    import formatRelativeDate from '../../filters/format-relative-date';

    export default {
        components: { Tile, LoadingIndicator },
        props: {
            isLoading: {
                type: Boolean,
                default: false,
            },

            /** @type {SystemAPI.Info} */
            info: {
                type: Object,
                required: true,
            },

            health: {
                type: Object,
                required: true,
            },
        },
        computed: {
            formattedDate() {
                if (!this.info) {
                    return null;
                }

                return formatDistanceToNow(new Date(this.info.worker_last_run), { addSuffix: true });
            },

            formattedUptime() {
                const uptimeDate = subSeconds(new Date(), this.health.uptime);
                return formatRelativeDate(uptimeDate);
            },
        },
    };
</script>
