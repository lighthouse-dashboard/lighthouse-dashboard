<template>
    <div>
        <nav class="green lighten-1">
            <div class="nav-wrapper">
                <router-link :to="{name: 'index'}" class="brand-logo center">Dashboard</router-link>
            </div>
        </nav>

        <ProjectBuild
            class='row'
            v-for="project in sortedProjects"
            :key="project.vcs_revision"
            :project="project"/>
    </div>
</template>

<script>
    import Vue from "vue";

    import ProjectBuild from "../components/ProjectBuild";

    export default {

        components: {
            ProjectBuild,
        },

        data() {
            return {
                sortedProjects: [],
                projects: Vue.config.projects
            };
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$circle
                    .sortProjectByLatestBuild(this.projects)
                    .then(sortedProjects => {
                        this.sortedProjects = sortedProjects;
                    });
                setTimeout(() => {
                    this.load();
                }, Vue.config.refreshInterval);
            }
        }
    };
</script>
