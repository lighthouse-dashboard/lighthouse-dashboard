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

            <ProjectBuild
                v-for="(project, index) in projects"
                class='col s12'
                :class="{'grey lighten-5': layout === 'list' ? index%2 : false, 'xl6': layout === 'grid'}"
                :key="project.buildIdentifier"
                :buildNum="project.buildIdentifier"
                :showArtifactList="false"
                :project="project"/>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import ProjectBuild from "@/components/ProjectBuild";

    export default {

        components: {
            ProjectBuild,
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
