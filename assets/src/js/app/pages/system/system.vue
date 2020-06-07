<template>
    <div class="system">
        <div/>
        <loading-indicator v-if="isLoading"/>
        <div class="system--content"
                v-else>
            <div class="system--row">
                <span>Label</span>
                <span>Value</span>
            </div>

            <div class="system--row">
                <span class="u-reset">Worker last run</span>
                <span class="u-reset">{{ formattedDate }}</span>
            </div>

            <div class="system--row">
                <span class="u-reset">DB Collections</span>
                <span class="u-reset">{{ info.db.collections }}</span>
            </div>

            <div class="system--row">
                <span class="u-reset">DB Data Size</span>
                <span class="u-reset">{{ info.db.dataSize }}</span>
            </div>
        </div>
        <div/>
    </div>
</template>

<script>
    import { formatDistanceToNow } from 'date-fns';
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';

    export default {
        components: { LoadingIndicator },
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
        },
        computed: {
            formattedDate() {
                if (!this.info) {
                    return null;
                }

                return formatDistanceToNow(new Date(this.info.worker_last_run), { addSuffix: true });
            },
        },
    };
</script>
