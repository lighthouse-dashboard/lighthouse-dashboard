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
            <div v-if="!projects" class="card-panel">
                <h5 class="center-align red-text">No Projects Available</h5>
            </div>

            <ProjectBuild
                v-for="(project, index) in projects"
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
                projects: null,
                layout: Vue.config.layout,
                updater: null,
            };
        },

        beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.load();
        },

        methods: {
            refreshProjects() {
                return this.$circle.sortProjectByLatestBuild(this.projects)
                    .then(projects => {
                        this.projects = projects;
                        this.updater = setTimeout(() => {
                            this.refreshProjects();
                        }, Vue.config.refreshInterval);
                    });
            },
            load() {
                this.$circle
                    .getAllProjects()
                    .then(projects => {
                        this.projects = projects;
                        return this.refreshProjects();
                    });
            }
        }
    };
</script>
