<template>
    <div class="row">
        <BuildInfo
            class='col s12'
            :class="{'xl4': artifacts}"
            :vcs="vcs"
            :username="username"
            :project="project"
            :buildNum="buildNum"
        />

        <div class='col s12 xl8' v-if="artifacts && artifacts.length > 0">
            <div class="card">
                <div class="card-content">
                    <div class="row">
                        <BuildArtifacts
                            :vcs="vcs"
                            :username="username"
                            :project="project"
                            :buildNum="buildNum"
                        />
                    </div>
                </div>
            </div>

        </div>
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
        },

        data() {
            return {
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
