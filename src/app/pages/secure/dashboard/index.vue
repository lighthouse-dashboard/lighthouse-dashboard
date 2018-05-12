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
            <div v-if="projects.length <= 0">
                <h5 class="center-align red-text">
                    {{ $t("message.no_projects_available") }}
                </h5>
            </div>

            <div class="col s12"
                 v-for="(project) in projects"
                 :key="project.project+project.lastBuild.build_num"
            >
                <div class="card">
                    <div class="card-content">
                        <project-title
                            :vcs="project.vcs"
                            :username="project.username"
                            :project="project.project"
                            :buildnum="project.lastBuild.build_num"
                        />

                        <trend-chart-table
                            :vcs="project.vcs"
                            :username="project.username"
                            :project="project.project"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import Build from "@/components/build-view";
    import TrendScoreTable from "@/components/trend-score-table";
    import TrendChartTable from "@/components/trend-chart-table";
    import ProjectTitle from "@/components/project-title";

    export default {

        components: {
            Build,
            TrendScoreTable,
            TrendChartTable,
            ProjectTitle,
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
                if (this.updater) {
                    clearTimeout(this.updater);
                    this.updater = null;
                }

                this.$api
                    .getAllProjects(this.$route.query.branch)
                    .then(projects => {
                        this.projects = projects;
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
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
                    });
            },
        },

        watch: {
            $route() {
                this.projects = null;
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
