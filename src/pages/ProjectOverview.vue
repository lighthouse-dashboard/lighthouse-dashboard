<template>
    <div>

        <nav class="green lighten-1">
            <div class="nav-wrapper">
                <router-link :to="{name: 'index'}" class="brand-logo center">{{username}}/{{project}}</router-link>
            </div>
        </nav>
        <div v-if="builds">
            <ProjectBuild
                v-for="build in builds" :project="projectObject" :buildNum="build.build_num" :key="build.build_num"/>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import ProjectBuild from "../components/ProjectBuild";

    export default {

        components: {
            ProjectBuild,
        },

        props: {
            vcs: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            project: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                builds: [],
                projectObject: null
            };
        },

        mounted() {
            this.projectObject = {
                vcs: this.vcs,
                username: this.username,
                project: this.project,
                token: this.token,
            };

            this.load();
        },

        methods: {
            load() {
                this.$circle
                    .getAllBuilds(this.projectObject)
                    .then(builds => {
                        this.builds = builds;
                    });
                setTimeout(() => {
                    this.load();
                }, Vue.config.refreshInterval);
            }
        }
    };
</script>
