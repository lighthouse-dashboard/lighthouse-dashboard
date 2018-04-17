<template>
    <ul>
        <li>
            <nav class="blue-grey">
                <div class="nav-wrapper">
                    <img class="logo" src="/static/dreipol_logo.png">
                </div>
            </nav>
        </li>

        <li><a class="subheader">v{{ version }}</a></li>

        <li>
            <router-link :to="{name: 'dashboard'}">
                {{ $t("message.dashboard_link_text") }}
            </router-link>
        </li>
        <li>
            <router-link :to="{name: 'help'}">
                {{ $t("message.help") }}
            </router-link>
        </li>

        <BranchList/>

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
    import BranchList from './BranchList';
    import { version } from '@/../package.json';

    export default {

        components: {
            ProjectListLink,
            BranchList
        },


        data() {
            return {
                projects: null,
                updater: null,
                isClearingCache: false,
                isLoading: false,
                version
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

                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }

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
                        if (e.status === 401) {
                            this.$auth.logout();
                        }
                    })
                    .finally(() => {
                        this.isClearingCache = false;
                    })
            }
        }
    };
</script>
