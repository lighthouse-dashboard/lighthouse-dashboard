<template>
    <div>
        <div class="navbar-fixed">
            <nav class="green lighten-1">
                <div class="nav-wrapper">
                    <router-link :to="{name: 'dashboard'}" class="brand-logo center">
                        {{ $t("dashboard.title")}}
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

            <div v-for="(project, index) in projects"
                 class='col s12'
                 :class="{'grey lighten-3':  index%2}"
                 :key="project.buildIdentifier"
            >
                <div class="row">
                    <div class="col s12">
                        <DashboardProjectTitle
                            :buildNum="project.buildIdentifier"
                            :vcs="project.vcs"
                            :username="project.username"
                            :project="project.project"/>
                    </div>
                    <div class="col s12">
                        <div class="card">
                            <div class="card-content">
                                <BuildArtifacts
                                    :buildNum="project.buildIdentifier"
                                    :vcs="project.vcs"
                                    :username="project.username"
                                    :project="project.project"
                                    :height="200"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import Build from "@/components/Build";
    import BuildArtifacts from "@/components/BuildArtifacts";
    import DashboardProjectTitle from "@/components/DashboardProjectTitle";

    export default {

        components: {
            Build,
            BuildArtifacts,
            DashboardProjectTitle
        },

        data() {
            return {
                projects: null,
                layout: Vue.config.layout,
                updater: null,
                isLoading: true,
            };
        },

        watch: {
            $route() {
                this.load();
            }
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
                    })
            }
        }
    };
</script>
