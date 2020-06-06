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
                <span class="u-reset">{{ info.worker_last_run | format-date }}</span>
            </div>
        </div>
        <div/>
    </div>
</template>

<script>
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';

    export default {
        components: { LoadingIndicator },
        props: {
            isLoading: {
                type: Boolean,
                default: false,
            },

            info: {
                type: Object,
                required: true,
            },
        },
    };
</script>
