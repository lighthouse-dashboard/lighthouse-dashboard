<template>
    <div>
        <project-history
            :vcs="vcs"
            :showX="true"
            :username="username"
            :project="project"/>
    </div>
</template>

<script>


    import ProjectHistory from "@/components/project-history";

    export default {
        components: {
            ProjectHistory,
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
