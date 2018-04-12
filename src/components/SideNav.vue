<template>
    <ul>
        <li>
            <nav class="blue-grey">
                <div class="nav-wrapper">
                    <img class="logo" src="/static/dreipol_logo.png">
                </div>
            </nav>
        </li>

        <li>
            <router-link :to="{name: 'dashboard'}">
                {{ $t("message.dashboard_link_text") }}
            </router-link>
        </li>


        <li><a class="subheader">{{ $t("message.branches") }}</a></li>

        <li v-for="branch in branches"
            :key="branch"
            :class="{'active' : $route.query.branch === branch}">
            <router-link :to="{name: 'index', query: {branch}}">
                {{branch}}
            </router-link>
        </li>

        <li><a class="subheader">{{ $t("message.projects") }}</a></li>

        <li v-if="projects && projects.length <= 0">
            <a class="disabled">
                {{ $t("message.no_projects_available") }}
            </a>
        </li>

        <loader v-if="isLoading"/>

        <ProjectListLink v-for="project in projects"
                         v-if="projects"
                         :project="project"
                         :key="project.project"/>

        <li><a class="subheader">{{ $t("message.options") }}</a></li>

        <li>
            <a @click="clearCache"
               v-if="!isClearingCache">
                <i
                    class="material-icons">delete</i> Clear cache
            </a>
        </li>
    </ul>
</template>

<script>

    import Vue from 'vue';
    import ProjectListLink from './ProjectListLink';

    export default {

        components: {
            ProjectListLink
        },


        data() {
            return {
                projects: null,
                updater: null,
                branches: Vue.config.selectableBranches,
                isClearingCache: false,
                isLoading: false,
            };
        },


        watch: {
            '$route.query.branch'() {
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
                this.projects = null;
                this.isLoading = true;
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
                    })
                    .finally(() => {
                        this.isLoading = false;
                    })
            },
            clearCache() {
                this.projects = null;
                this.isClearingCache = true;
                this.isLoading = true;

                this.$circle.invalidateProjectsCache(this.$route.query.branch)
                    .then(() => {
                        return this.load();
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                    })
                    .finally(() => {
                        this.isClearingCache = false;
                    })
            }
        }
    };
</script>

<style scoped>
    .logo {
        height: 44px;
        margin-left: 25px;
        margin-top: 10px;
    }
</style>
