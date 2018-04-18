<template>
    <div class="row">
        <div class='col s12'>
            <BuildInfo
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildNum="buildNum"
            />
        </div>

        <div class='col s12 l9'>
            <BuildArtifacts
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildNum="buildNum"
            />
        </div>

        <div class='col s12 l3'>
            <ArtifactList
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildNum="buildNum"
            />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    import BuildInfo from "@/components/BuildInfo";
    import BuildArtifacts from "@/components/BuildArtifacts";
    import ArtifactList from '@/components/ArtifactList';


    export default {

        components: {
            BuildArtifacts,
            BuildInfo,
            ArtifactList
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
        },

        methods: {

        }
    };
</script>
