<template>
    <div>
        <div class="navbar-fixed">
            <nav class="green lighten-1">
                <div class="nav-wrapper">
                    <router-link class="brand-logo center" :to="{name: 'dashboard'}">
                        {{ $t("dashboard.title") }}
                    </router-link>
                </div>
            </nav>
        </div>

        <div class="row" v-if="isLoading">
            <loader/>
        </div>

        <div class="row" v-if="!isLoading && projects">
            <div v-if="projects.length <= 0" class="card-panel">
                <h5 class="center-align red-text">
                    {{ $t("message.no_projects_available") }}
                </h5>
            </div>

            <div class="col s12"
                 v-for="(project, index) in projects"
                 :class="{'grey lighten-5': index%2}"
                 :key="project.lastBuild.build_num"
            >
                <project-trend
                    :vcs="project.vcs"
                    :username="project.username"
                    :project="project.project"
                    :buildNum="project.lastBuild.build_num"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import Build from "@/components/Build";
    import BuildArtifacts from "@/components/BuildArtifacts";
    import DashboardProjectTitle from "@/components/DashboardProjectTitle";
    import ProjectHistory from "@/components/ProjectHistory";
    import ProjectTrend from "@/components/ProjectTrend";

    export default {

        components: {
            Build,
            BuildArtifacts,
            DashboardProjectTitle,
            ProjectHistory,
            ProjectTrend
        },

        data() {
            return {
                projects: null,
                layout: Vue.config.layout,
                updater: null,
                isLoading: true,
            };
        },

        methods: {
            load() {
                this.$api
                    .getAllProjects(this.$route.query.branch)
                    .then(projects => {
                        this.projects = projects;
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        watch: {
            $route() {
                this.load();
            },
        },

        beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.load();
        },
    };
</script>
