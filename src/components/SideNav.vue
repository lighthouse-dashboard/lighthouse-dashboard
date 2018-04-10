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

    import ProjectListLink from './ProjectListLink';

    export default {

        components: {
            ProjectListLink
        },


        data() {
            return {
                projects: null
            };
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$circle
                    .getAllProjects()
                    .then(projects => {
                        return this.$circle.sortProjectByLatestBuild(projects)
                    })
                    .then(projects => {
                        this.projects = projects;
                    })
                    .catch((e) => {
                        this.$toast.notify(e.message);
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
