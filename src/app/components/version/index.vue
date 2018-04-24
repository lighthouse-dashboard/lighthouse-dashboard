<template>
    <span>
        v{{ version }}
    </span>
</template>

<script>
    import Vue from 'vue';
    import { version } from '@/../../package.json';

    export default {

        data() {
            return {
                version,
                apiVersion: null,
                updater: null,
            };
        },

        methods: {
            loadVersion() {
                this.$api.getVersion()
                    .then((apiVersion) => {
                        if (this.apiVersion !== apiVersion && this.apiVersion) {
                            location.reload();
                            return;
                        }

                        this.apiVersion = apiVersion;
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.versionUpdateInterval);
                    });
            },
        },

        beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.loadVersion();
        }
    }
</script>
