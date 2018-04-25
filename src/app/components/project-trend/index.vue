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

    import TrendTable from "@/components/trend-score-table";


    export default {

        components: {
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
        },
    };
</script>
