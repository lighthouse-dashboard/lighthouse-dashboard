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
            <div class="card">
                <div class="card-content">
                    <div class="card-title">Dreihouse</div>

                    <build-charts
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                        :buildnum="buildnum"
                    />
                </div>
            </div>
        </div>

        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <div class="card-title">Dreiguard</div>
                    <dreiguard-overview
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                        :buildnum="buildnum"/>
                </div>
            </div>
        </div>

        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <div class="card-title">{{ $t("message.artifacts") }}</div>
                    <artifact-list
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                        :buildnum="buildnum"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BuildTitle from "@/components/build-title";
    import BuildCharts from "@/components/build-charts";
    import ArtifactList from '@/components/artifact-list';
    import DreiguardOverview from '@/components/dreiguard-overview';


    export default {

        components: {
            BuildCharts,
            BuildTitle,
            ArtifactList,
            DreiguardOverview,
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
