<template>
    <div class="system">
        <div/>
        <loading-indicator v-if="isLoading"/>
        <div class="system--content">
            <tile title="System"
                    class="system--section">
                <div class="system--row">
                    <span class="u-reset">Worker last run</span>
                    <span class="u-reset">{{ formattedDate }}</span>
                </div>

                <div class="system--row">
                    <span class="u-reset">Worker is running</span>
                    <span class="u-reset"
                            v-if="info">{{ info.worker_is_running }}</span>
                </div>

                <div class="system--row">
                    <span class="u-reset">Uptime</span>
                    <span class="u-reset"
                            v-if="info">{{ formattedUptime }}</span>
                </div>
            </tile>

            <tile title="Database"
                    class="system--section">
                <div class="system--row">
                    <span class="u-reset">DB Collections</span>
                    <span class="u-reset"
                            v-if="info">{{ info.db.collections }}</span>
                </div>

                <div class="system--row">
                    <span class="u-reset">DB Data Size</span>
                    <span class="u-reset"
                            v-if="info">{{ info.db.dataSize }}</span>
                </div>


                <div class="system--row">
                    <span class="u-reset">DB Connection</span>
                    <span class="u-reset"
                            v-if="health">{{ health.db_connection }}</span>
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
                if (!this.health) {
                    return null;
                }

                const uptimeDate = subSeconds(new Date(), this.health.uptime);
                return formatRelativeDate(uptimeDate);
            },
        },
    };
</script>
