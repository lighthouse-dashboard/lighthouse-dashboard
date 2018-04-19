<template>
    <div>
        <project-history
            :vcs="vcs"
            :username="username"
            :project="project"/>
    </div>
</template>

<script>

    import ProjectHistory from "@/components/ProjectHistory";

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
