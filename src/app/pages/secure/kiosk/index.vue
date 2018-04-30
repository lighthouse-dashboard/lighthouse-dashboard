<template>
    <div class="container">

        <div class="row">
            <div class="col s12">
                <h4>{{ $t("dashboard.title") }}</h4>
            </div>
        </div>

        <div class="row" v-if="isLoading">
            <loader/>
        </div>

        <div class="row" v-if="!isLoading && projects">
            <div class="col s12" v-if="projects.length <= 0">
                <h5 class="center-align red-text">
                    {{ $t("message.no_projects_available") }}
                </h5>
            </div>

            <div class="col s12"
                 v-for="(project) in projects"
                 :key="project.lastBuild.build_num"
            >
                <project-title
                    :vcs="project.vcs"
                    :username="project.username"
                    :project="project.project"
                    :buildnum="project.lastBuild.build_num"
                />

                <trend-score-table
                    :vcs="project.vcs"
                    :username="project.username"
                    :project="project.project"
                />
            </div>
        </div>

        <div class="row">
            <div class="col s12">
                <p class="center">
                    <version/>
                    <router-link :to="{name: 'dashboard'}">
                        {{ $t("message.dashboard_link_text") }}
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import Build from "@/components/build-view";
    import TrendScoreTable from "@/components/trend-score-table";
    import TrendChartTable from "@/components/trend-chart-table";
    import Version from "@/components/version";
    import ProjectTitle from "@/components/project-title";

    export default {

        components: {
            Build,
            TrendScoreTable,
            TrendChartTable,
            Version,
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
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
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
                this.updater = null;
            }
        },

        mounted() {
            this.load();
        },
    };
</script>
