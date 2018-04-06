<template>
    <div>
        <div class="navbar-fixed">
            <nav class="green lighten-1">
                <div class="nav-wrapper">
                    <router-link :to="{name: 'index'}" class="brand-logo center">Dreihouse Dashboard</router-link>
                </div>
            </nav>
        </div>

        <div class="row">
            <ProjectBuild
                v-for="(project, index) in sortedProjects"
                class='col s12'
                :class="{'grey lighten-5': layout === 'list' ? index%2 : false, 'xl6': layout === 'grid'}"
                :key="project.buildIdentifier"
                :project="project"/>
        </div>
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
                projects: Vue.config.projects,
                layout: Vue.config.layout,
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
                        setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
                    });

            }
        }
    };
</script>
