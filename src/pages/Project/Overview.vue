<template>
    <div>
        <loader v-if="!builds"/>

        <div v-if="builds">
            <ProjectBuild
                v-for="(build, index) in builds"
                :class="{'grey lighten-5': index%2}"
                :project="projectObject"
                :buildNum="build.build_num"
                :showTitle="false"
                :key="build.build_num"/>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import ProjectBuild from "../../components/ProjectBuild";

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
            }
        },

        watch: {
            token() {
                this.load();
            },
            project() {
                this.load();
            }
        },


        data() {
            return {
                builds: null,
                projectObject: null,
                updater: null,
            };
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
                this.projectObject = {
                    vcs: this.vcs,
                    username: this.username,
                    project: this.project
                };

                this.$circle
                    .getAllBuilds(this.projectObject)
                    .then(builds => {
                        this.builds = builds;
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
                    })
                    .catch((e) => {
                        this.$toast.notify(e.message);
                    })
            }
        }
    };
</script>
