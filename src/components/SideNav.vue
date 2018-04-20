<template>
    <ul>
        <li>
            <nav class="blue-grey">
                <div class="nav-wrapper">
                    <img class="logo" src="/static/dreipol_logo.png">
                </div>
            </nav>
        </li>

        <li><a class="subheader"><version/></a></li>

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

        <project-list-link v-for="project in projects"
                           v-if="projects"
                           :project="project"
                           :key="project.project"/>

        <li><a class="subheader">{{ $t("message.options") }}</a></li>

        <li>
            <a v-if="!isClearingCache" @click="clearCache">
                <i class="material-icons">delete</i> {{ $t('message.clear_cache') }}
            </a>
        </li>
    </ul>
</template>

<script>

    import Vue from 'vue';
    import ProjectListLink from './ProjectListLink';
    import BranchList from './BranchList';
    import Version from './Version';

    export default {

        components: {
            ProjectListLink,
            BranchList,
            Version
        },

        data() {
            return {
                projects: null,
                updater: null,
                isClearingCache: false,
                isLoading: false,
            };
        },

        methods: {
            load() {
                this.isLoading = true;
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

            clearCache() {
                this.projects = null;
                this.isClearingCache = true;
                this.isLoading = true;

                this.$api.invalidateProjectsCache(this.$route.query.branch)
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
                    });
            },
        },

        watch: {
            '$route.query.branch'() {
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
