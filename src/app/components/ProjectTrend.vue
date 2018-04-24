<template>
    <div class="row">
        <div class="col s12">
            <dashboard-project-title
                :buildNum="buildNum"
                :vcs="vcs"
                :username="username"
                :project="project"/>
        </div>

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
    import DashboardProjectTitle from "@/components/DashboardProjectTitle";
    import TrendTable from "@/components/trend/TrendTable";

    export default {

        components: {
            DashboardProjectTitle,
            TrendTable,
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
            buildNum: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
            };
        },
    };
</script>
