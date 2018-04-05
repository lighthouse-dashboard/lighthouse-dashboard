<template>
    <div class="row" v-if="build">
        <BuildInfo
            class='col s12 m4'
            :build="build"
            :project="project"
        />

        <BuildView
            v-if="artifacts"
            class='col s12 m8'
            :artifacts="artifacts"/>
    </div>
</template>

<script>
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
            }
        },

        data() {
            return {
                build: null,
                artifacts: [],
            };
        },

        mounted() {
            this.getLatestBuild();
            this.getLatestBuildArtifacts();
        },

        methods: {
            getLatestBuild() {
                this.$circle.getBuildInfo(this.project, this.buildNum)
                    .then((build) => {
                        this.build = build;
                    })
            },

            getLatestBuildArtifacts() {
                this.$circle
                    .getDashboardArtifacts(this.project, this.buildNum ? this.buildNum : 'latest')
                    .then(artifacts => {
                        this.artifacts = artifacts;
                    });
            }
        }
    };
</script>
