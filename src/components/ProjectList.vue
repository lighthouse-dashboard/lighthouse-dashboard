<template>
    <ul>
        <li>
            <nav class="blue-grey">
                <div class="nav-wrapper">
                    <img class="logo" src="/static/dreipol_logo.png">
                </div>
            </nav>

        <li>
            <router-link :to="{name: 'index'}">
                Dashboard
            </router-link>
        </li>

        <li><a class="subheader">Projects</a></li>

        <ProjectListLink v-for="project in projects"
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

        props: {
            projects: {
                type: Array,
                required: true
            },

        },

        data() {
            return {};
        }
    };
</script>

<style scoped>
    .logo {
        height: 50px;
        margin-left: 25px;
        margin-top: 5px;
    }
</style>
