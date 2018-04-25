<template>
    <div>
        <loader v-if="!builds"/>

        <div v-if="builds">
            <build
                v-for="(build, index) in builds"
                :class="{'grey lighten-5': index%2}"
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildNum="build.build_num"
                :key="build.build_num"/>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import Build from "@/components/build-view";

    export default {

        components: {
            Build,
        },

        props: {
            vcs: {
                type: String,
                required: true,
            },

            username: {
                type: String,
                required: true,
            },

            project: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                builds: null,
                projectObject: null,
                updater: null,
            };
        },

        methods: {
            load() {
                this.projectObject = {
                    vcs: this.vcs,
                    username: this.username,
                    project: this.project,
                };

                this.$api
                    .getAllBuilds(this.vcs, this.username, this.project, undefined, this.$route.query.branch)
                    .then(builds => {
                        this.builds = index;
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
                    });
            },
        },

        watch: {
            token() {
                this.load();
            },

            project() {
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
