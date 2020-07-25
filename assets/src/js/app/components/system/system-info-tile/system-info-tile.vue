<template>
    <tile title="System">
        <loading-indicator v-if="isLoading"/>
        <list>
            <list-item>
                <span class="u-reset">
                    {{ $t('system.version-label') }}
                </span>
                <span class="u-reset">v{{ version }}</span>
            </list-item>
        </list>
    </tile>
</template>

<script>
    import { subSeconds } from 'date-fns';
    import formatRelativeDate from '../../../filters/format-relative-date';
    import ListItem from '../../base/list/list-item/list-item';
    import LoadingIndicator from '../../base/loading-indicator/loading-indicator';
    import Tile from '../../tile/tile';

    export default {
        components: { ListItem, LoadingIndicator, Tile },
        props: {
            isLoading: {
                type: Boolean,
                default: false,
            },

            /** @type {Health.Health} */
            health: {
                type: Object,
                default: null,
            },

            version: {
                type: String,
                default: '',
            },
        },

        computed: {
            formattedUptime() {
                if (!this.health) {
                    return null;
                }

                const uptimeDate = subSeconds(new Date(), this.health.uptime);
                return formatRelativeDate(uptimeDate);
            },
        }
    };
</script>
