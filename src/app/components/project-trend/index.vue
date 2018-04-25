<template>
    <div class="row">
        <div class="col s12">
            <trend-table
                :vcs="vcs"
                :username="username"
                :project="project"
            />
        </div>
    </div>
</template>

<script>

    import ProjectTitle from '@/components/project-title';
    import BuildStatus from '@/components/build-status';
    import TrendTable from "@/components/trend-score-table";
    import BuiltAt from '@/components/built-at';
    import CommitDetail from '@/components/commit-detail';


    export default {

        components: {
            TrendTable,
            BuildStatus,
            BuiltAt,
            CommitDetail,
            ProjectTitle,
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
        },
    };
</script>
