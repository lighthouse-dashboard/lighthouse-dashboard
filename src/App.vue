<template>
  <div id="app">
    <div class='buildView' v-for="project in sortedProjects" :key="project.vcs_revision">
        <BuildInfo class='info' :vcs="project.vcs" :username="project.username" :project="project.project" :token="project.token"/>        
        <BuildView class='view' :vcs="project.vcs" :username="project.username" :project="project.project" :token="project.token"/>
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
            projects: [
                {
                    vcs: "github",
                    username: "faebeee",
                    project: "lh-reporter-test",
                    token: "ce17db5395f697724da815ce49773bd9068f921d"
                },

                {
                    vcs: "github",
                    username: "dreipol",
                    project: "dreipol-website",
                    token: "207e6f55687b5dc8d43dea013ab8165872693eb0"
                }
            ]
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

<style scoped>
.buildView {
    display: flex;
    flex-flow: row;
}
.view {
    width: 100%;
}
.info {
    width: 30%;
}
</style>