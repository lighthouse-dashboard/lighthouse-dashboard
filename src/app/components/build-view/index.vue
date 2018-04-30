<template>
    <div class="row">
        <div class="col s12">
            <build-title
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildnum="buildnum"
            />
        </div>

        <div class="col s12">
            <build-charts
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildnum="buildnum"
            />
        </div>

        <div class="col s12">
            <artifact-list
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildnum="buildnum"
            />
        </div>
    </div>
</template>

<script>
    import BuildTitle from "@/components/build-title";
    import BuildCharts from "@/components/build-charts";
    import ArtifactList from '@/components/artifact-list';


    export default {

        components: {
            BuildCharts,
            BuildTitle,
            ArtifactList,
        },

        props: {
            vcs: {
                type: String,
                required: true,
            },

            username: {
                type: String,
                required: true,
            },

            project: {
                type: String,
                required: true,
            },

            buildnum: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                updater: null,
                artifacts: null,
            };
        },

    };
</script>
