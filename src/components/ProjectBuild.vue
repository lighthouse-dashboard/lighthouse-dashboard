<template>
    <div class="row" v-if="build">
        <BuildInfo
            class='col s12'
            :class="{'xl4': artifacts}"
            :build="build"
            :project="project"
            :showArtifactList="showArtifactList"
            :showTitle="showTitle"
        />

        <BuildView
            v-if="artifacts && artifacts.length > 0"
            class='col s12 xl8'
            :vcs="project.vcs"
            :username="project.username"
            :project="project.project"
            :buildNum="buildNum"
        />
    </div>
</template>

<script>
    import Vue from 'vue';

    import BuildInfo from "@/components/BuildInfo";
    import BuildView from "@/components/BuildView";
    import ArtifactChart from "@/components/ArtifactChart";

    export default {

        components: {
            BuildView,
            BuildInfo,
            ArtifactChart
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
            },

            showArtifactList: {
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
                this.$circle.getBuildInfo(this.project.vcs, this.project.username, this.project.project, false, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }
                    })
            },

            getLatestBuildArtifacts() {
                this.$circle
                    .getDashboardArtifacts(this.project.vcs, this.project.username, this.project.project, this.buildNum)
                    .then(artifacts => {
                        this.artifacts = artifacts.length > 0 ? artifacts : null;
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }
                    })
            }
        }
    };
</script>
