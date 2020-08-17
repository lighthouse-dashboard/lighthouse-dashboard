<template>
    <tile :title="$t('system.database-tile-title')"
            class="system--section">
        <loading-indicator v-if="isLoading"/>
        <div class="system--row"
                v-if="info">
            <span class="u-reset">
                {{ $t('system.database-collections') }}</span>
            <span class="u-reset"
                    v-if="info">
                {{ info.db.collections }}
            </span>
        </div>

        <div class="system--row"
                v-if="info">
            <span class="u-reset">
                {{ $t('system.database-size') }}
            </span>
            <span class="u-reset"
                    v-if="info">{{ info.db.dataSize }}</span>
        </div>


        <div class="system--row"
                v-if="health">
            <span class="u-reset">
                {{ $t('system.database-connection') }}
            </span>
            <span class="u-reset"
                    v-if="health">{{ health.db_connection }}</span>
        </div>
    </tile>
</template>

<script>
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

            /** @type {Health.Health} */
            health: {
                type: Object,
                default: null,
            },
        },
    };
</script>
