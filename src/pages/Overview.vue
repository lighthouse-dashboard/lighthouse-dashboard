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
            load() {
                this.$circle
                    .getAllProjects(Vue.config.circleToken)
                    .then(projects => {
                        return this.$circle.sortProjectByLatestBuild(projects)
                    })
                    .then(projects => {
                        this.projects = projects;
                    });
            }
        }
    };
</script>
