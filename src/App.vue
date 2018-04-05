<template>
  <div id="app" class="row">
    <div class='row' v-for="project in sortedProjects" :key="project.vcs_revision">
        <BuildInfo class='col s12 m4' :vcs="project.vcs" :username="project.username" :project="project.project" :token="project.token"/>
        <BuildView class='col s12 m8' :vcs="project.vcs" :username="project.username" :project="project.project" :token="project.token"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import BuildInfo from "./components/BuildInfo";
import BuildView from "./components/BuildView";

export default {
    name: "App",

    components: {
        BuildView,
        BuildInfo
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
