<template>
    <div class="row" v-if="build">
        <BuildInfo
            class='col s12'
            :class="{'xl4': artifacts}"
            :build="build"
            :vcs="vcs"
            :username="username"
            :project="project"
            :buildNum="buildNum"
            :showArtifactList="showArtifactList"
            :showTitle="showTitle"
        />

        <BuildArtifacts
            v-if="artifacts && artifacts.length > 0"
            class='col s12 xl8'
            :vcs="vcs"
            :username="username"
            :project="project"
            :buildNum="buildNum"
        />
    </div>
</template>

<script>
    import Vue from 'vue';

    import BuildInfo from "@/components/BuildInfo";
    import BuildArtifacts from "@/components/BuildArtifacts";

    export default {

        components: {
            BuildArtifacts,
            BuildInfo,
        },

        props: {
            vcs: {
                type: String,
                required: true
            },

            username: {
                type: String,
                required: true
            },

            project: {
                type: String,
                required: true
            },

            buildNum: {
                type: Number,
                required: true
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
                this.$circle.getBuildInfo(this.vcs, this.username, this.project, false, this.$route.query.branch)
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
                    .getDashboardArtifacts(this.vcs, this.username, this.project, this.buildNum)
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
