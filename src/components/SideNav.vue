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
            <router-link :to="{name: 'index'}">
                Dashboard
            </router-link>
        </li>


        <li><a class="subheader">Branches</a></li>

        <li v-for="branch in branches"
            :key="branch"
            :class="{'active' : $route.query.branch === branch}">
            <router-link :to="{name: 'index', query: {branch}}">
                {{branch}}
            </router-link>
        </li>

        <li><a class="subheader">Projects</a></li>

        <li v-if="projects && projects.length <= 0">
            <a class="disabled">No Projects Available</a>
        </li>

        <ProjectListLink v-for="project in projects"
                         v-if="projects"
                         :project="project"
                         :key="project.project"/>
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
                branches: Vue.config.selectableBranches
            };
        },


        watch : {
            $route(){
                this.load();
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
                        return this.$circle.sortProjectByLatestBuild(projects)
                    })
                    .then(projects => {
                        this.projects = projects;
                    })
                    .catch((e) => {
                        this.$toast.error(e);
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
