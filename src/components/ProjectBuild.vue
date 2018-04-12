<template>
    <div class="row" v-if="build">
        <BuildInfo
            class='col s12'
            :class="{'xl4': artifacts}"
            :build="build"
            :project="project"
            :showTitle="showTitle"
        />

        <BuildView
            v-if="artifacts"
            class='col s12 xl8'
            :artifacts="artifacts"
        />
    </div>
</template>

<script>
    import Vue from 'vue';

    import BuildInfo from "../components/BuildInfo";
    import BuildView from "../components/BuildView";

    export default {

        components: {
            BuildView,
            BuildInfo
        },

        props: {
            project: {
                type: Object,
                required: true
            },

            buildNum: {
                type: Number,
                required: false,
                default: null,
            },

            showTitle: {
                type: Boolean,
                required: false,
                default: true
            }
        },

        data() {
            return {
                build: null,

                updater: null,
                artifacts: null,
            };
        },

         beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.load();
            this.getLatestBuildArtifacts();
        },

        methods: {
            load() {
                this.$circle.getBuildInfo(this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                    })
            },

            getLatestBuildArtifacts() {
                this.$circle
                    .getDashboardArtifacts(this.project, this.buildNum ? this.buildNum : 'latest')
                    .then(artifacts => {
                        this.artifacts = artifacts.length > 0 ? artifacts : null;
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                    })
            }
        }
    };
</script>
